// POST /api/verify
// Looks up a watermark ID and returns who the document was sent to

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { z } from 'zod';
import { sha256 } from '@/lib/utils/hash';

const RequestSchema = z.object({
  watermarkId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid watermark ID' }, { status: 400 });
    }

    // Rate limit
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const ipHash = await sha256(ip);
    const rateLimitKey = `rl:${ipHash}`;
    const currentCount = await kv.get(rateLimitKey);
    const count = currentCount ? parseInt(currentCount as string) : 0;
    if (count >= 10) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    await kv.set(rateLimitKey, String(count + 1), { ex: 3600 });

    // Look up in database
    const { watermarkId } = parsed.data;
    const raw = await kv.get(`wm:${watermarkId}`);

    if (!raw) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    const record = JSON.parse(raw as string);

    // Return result — do NOT return ipHash to the client
    return NextResponse.json({
      found: true,
      recipientName:    record.recipientName,
      recipientEmail:   record.recipientEmail,
      watermarkText:    record.watermarkText,
      originalFilename: record.originalFilename,
      createdAt:        record.createdAt,
    }, { status: 200 });

  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
