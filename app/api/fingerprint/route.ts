// POST /api/fingerprint
// Saves watermark ID + recipient info to database
// Called after the PDF is generated

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { z } from 'zod';
import { sha256 } from '@/lib/utils/hash';

const RequestSchema = z.object({
  watermarkId:    z.string().uuid(),
  recipientName:  z.string().min(1).max(80),
  recipientEmail: z.string().email().max(120),
  watermarkText:  z.string().min(1).max(60),
  filename:       z.string().min(1).max(255),
});

export async function POST(request: NextRequest) {
  try {
    // Step 1 — Parse body
    const body = await request.json();

    // Step 2 — Validate
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Step 3 — Hash the IP (never store raw IP)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const ipHash = await sha256(ip);

    // Step 4 — Rate limit: max 10 requests per IP per hour
    const rateLimitKey = `rl:${ipHash}`;
    const currentCount = await kv.get(rateLimitKey);
    const count = currentCount ? parseInt(currentCount as string) : 0;
    if (count >= 10) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    await kv.set(rateLimitKey, String(count + 1), { ex: 3600 });

    // Step 5 — Save to database
    const { watermarkId, recipientName, recipientEmail, watermarkText, filename } = parsed.data;
    const record = {
      recipientName,
      recipientEmail,
      watermarkText,
      originalFilename: filename,
      createdAt: new Date().toISOString(),
      ipHash,
    };

    // Key = "wm:" + UUID, expires in 90 days
    await kv.set(`wm:${watermarkId}`, JSON.stringify(record), { ex: 7776000 });

    return NextResponse.json({ success: true, watermarkId }, { status: 200 });

  } catch (error) {
    console.error('Fingerprint API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
