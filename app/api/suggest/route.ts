import Groq from "groq-sdk"
import { NextResponse, NextRequest } from "next/server"

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title } = body

        const message = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 10,
            messages: [
                {
                    role: "user",
                    content: `Given this todo task: "${title}", suggest a priority level. Reply with ONLY one word: low, medium, or high.`,
                },
            ],
        })

        const priority = message.choices[0].message.content
            ?.trim()
            .toLowerCase()

        return NextResponse.json({ priority })

    } catch (error: any) {
        console.error("Groq error:", error?.message)
        return NextResponse.json(
            { error: error?.message || "Something went wrong" },
            { status: 500 }
        )
    }
}