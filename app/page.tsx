"use client"

import { useState } from "react"
import TodoItem from "./components/TodoItems"

interface Todo {
  id: number
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn TypeScript", completed: true, priority: "high" },
    { id: 2, title: "Build React app", completed: false, priority: "medium" },
    { id: 3, title: "Deploy to AWS", completed: false, priority: "high" },
  ])

  const completeTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    ))
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          onComplete={completeTodo}
        />
      ))}
    </main>
  )
}