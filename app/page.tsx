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

  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const addTodo = () => {
    if (title.trim() === "") return
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      priority
    }
    setTodos([...todos, newTodo])
    setTitle("")
  }

  const completeTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    ))
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      <input
        className="border rounded px-3 py-2 flex-1"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add your Todo..."
      />

      <select
        className="border rounded px-3 py-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>


      <button
        onClick={addTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>

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