import { NextResponse } from "next/server"

interface Todo {
    id: number,
    title: string,
    completed: boolean,
    priority: "low" | "medium" | "high",
}

const todos: Todo[] = [
    { id: 1, title: "learn TypeScript", completed: false, priority: "high" },
    { id: 2, title: "Build React App", completed: true, priority: "medium" },
    { id: 3, title: "Deploy to Aws", completed: true, priority: "low" },
    { id: 4, title: "Learn Docker", completed: true, priority: "medium" },
    { id: 5, title: "Learn LLM", completed: true, priority: "high" },
]

export async function GET() {
    return NextResponse.json(todos)
}