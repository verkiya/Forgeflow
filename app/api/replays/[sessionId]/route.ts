import { NextRequest, NextResponse } from "next/server"
import Browserbase from "@browserbasehq/sdk"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params

  try {
    const apiKey = process.env.BROWSERBASE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "BROWSERBASE_API_KEY not configured" },
        { status: 500 }
      )
    }

    // Proxy the HLS playlist using fetch directly to avoid SDK parse issues,
    // since we want to return the raw m3u8 string.
    const res = await fetch(
      `https://www.browserbase.com/v1/sessions/${sessionId}/replay`,
      {
        headers: {
          "x-bb-api-key": apiKey,
        },
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Recording not ready or not found" },
        { status: res.status }
      )
    }

    const text = await res.text()

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
      },
    })
  } catch (error: any) {
    console.error("Failed to fetch replay:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to fetch replay" },
      { status: 500 }
    )
  }
}
