import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { z } from 'zod'
import { sha256 } from '@/lib/utils/hash'

const RequestSchema = z.object({
  watermarkId: z.string().uuid(),
})

interface StoredRecord {
  recipientName: string
  recipientEmail: string
  watermarkText: string
  originalFilename: string
  createdAt: string
  ipHash: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    const parsed = RequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid watermark ID' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for') ?? (request as unknown as { ip?: string }).ip ?? 'unknown'
    const ipHash = await sha256(ip)

    if (!process.env.KV_REST_API_URL) {
      console.warn('[verify] KV not configured. Returning mock data.')
      return NextResponse.json({
        found: true,
        recipientName: 'Mock Environment User',
        recipientEmail: 'mock@example.com',
        watermarkText: 'Mock Environment Watermark',
        originalFilename: 'mock-file.pdf',
        createdAt: new Date().toISOString()
      }, { status: 200 })
    }

    const rateLimitKey = `rl:${ipHash}`
    const currentCount = await kv.get<string>(rateLimitKey)
    const count = currentCount ? parseInt(currentCount) : 0

    if (count >= 10) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    await kv.set(rateLimitKey, String(count + 1), { ex: 3600 })

    const { watermarkId } = parsed.data
    const raw = await kv.get<string>(`wm:${watermarkId}`)

    if (!raw) {
      return NextResponse.json({ found: false }, { status: 200 })
    }

    const record = JSON.parse(raw) as StoredRecord

    // Never return ipHash to the client
    return NextResponse.json({
      found:            true,
      recipientName:    record.recipientName,
      recipientEmail:   record.recipientEmail,
      watermarkText:    record.watermarkText,
      originalFilename: record.originalFilename,
      createdAt:        record.createdAt,
    }, { status: 200 })

  } catch (error) {
    console.error('[verify] error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
