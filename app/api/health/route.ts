import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(): Promise<NextResponse> {
  try {
    await kv.set('health-check', 'ok', { ex: 60 })
    const result = await kv.get('health-check')
    return NextResponse.json({
      status: 'ok',
      kv: result === 'ok' ? 'connected' : 'error',
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      kv: 'not connected',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
