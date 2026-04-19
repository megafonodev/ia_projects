import { NextResponse } from 'next/server'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const isVideo = body?.mode === 'video'
  const webhookUrl = isVideo
    ? process.env.N8N_VIDEO_WEBHOOK_URL
    : process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      {
        error: isVideo
          ? 'Webhook de video no configurada (N8N_VIDEO_WEBHOOK_URL).'
          : 'Webhook de imagen no configurada (N8N_WEBHOOK_URL).',
      },
      { status: 500 }
    )
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: `Error del webhook: ${res.status}` },
      { status: res.status }
    )
  }

  return NextResponse.json({ ok: true })
}
