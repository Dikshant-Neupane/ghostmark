import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { z } from 'zod'
import { sha256 } from '@/lib/utils/hash'

const RequestSchema = z.object({
  watermarkId:    z.string().uuid(),
  recipientName:  z.string().min(1).max(80),
  recipientEmail: z.string().email().max(120),
  watermarkText:  z.string().min(1).max(60),
  filename:       z.string().min(1).max(255),
})

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    const parsed = RequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { watermarkId, recipientName, recipientEmail, watermarkText, filename } = parsed.data

    // Fallback if KV is not configured
    if (!process.env.KV_REST_API_URL) {
      console.warn('[fingerprint] KV not configured. Skipping database store.')
      return NextResponse.json({ success: true, watermarkId }, { status: 200 })
    }

    const ip = request.headers.get('x-forwarded-for') ?? (request as unknown as { ip?: string }).ip ?? 'unknown'
    const ipHash = await sha256(ip)

    // Rate limit — max 10 per IP per hour
    const rateLimitKey = `rl:${ipHash}`
    const currentCount = await kv.get<string>(rateLimitKey)
    const count = currentCount ? parseInt(currentCount) : 0

    if (count >= 10) {
      return NextResponse.json(
        { error: 'Too many requests. Try again in an hour.' },
        { status: 429 }
      )
    }

    await kv.set(rateLimitKey, String(count + 1), { ex: 3600 })

    const record = {
      recipientName,
      recipientEmail,
      watermarkText,
      originalFilename: filename,
      createdAt: new Date().toISOString(),
      ipHash,
    }

    // Store — expires in 90 days (7776000 seconds)
    await kv.set(`wm:${watermarkId}`, JSON.stringify(record), { ex: 7776000 })

    return NextResponse.json({ success: true, watermarkId }, { status: 200 })

  } catch (error) {
    console.error('[fingerprint] error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
