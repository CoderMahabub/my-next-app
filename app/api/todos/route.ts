import { NextRequest, NextResponse } from "next/server";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

const todos: Todo[] = [
  { id: 1, title: "learn TypeScript", completed: false, priority: "high" },
  { id: 2, title: "Build React App", completed: false, priority: "medium" },
  { id: 3, title: "Deploy to Aws", completed: true, priority: "low" },
  { id: 4, title: "Learn Docker", completed: true, priority: "medium" },
  { id: 5, title: "Learn LLM", completed: false, priority: "high" },
  {
    id: 6,
    title: "Solve Coding Problems",
    completed: true,
    priority: "medium",
  },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newTodo: Todo = {
    id: Date.now(),
    title: body.title,
    completed: false,
    priority: body.priority,
  };

  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
