"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import TodoItem from "./components/TodoItems"

interface Todo {
  id: number
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

export default function Home() {
  const { data: session, status } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (session) {
      fetch("/api/todos")
        .then(res => res.json())
        .then(data => {
          setTodos(data)
          setLoading(false)
        })
    }
  }, [session])

  const addTodo = async () => {
    if (title.trim() === "") return
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    })
    const newTodo: Todo = await res.json()
    setTodos([...todos, newTodo])
    setTitle("")
  }

  const completeTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    ))
  }

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const suggestPriority = async () => {
    if (title.trim() === "") return
    const res = await fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    const data = await res.json()
    if (data.priority === "low" || data.priority === "medium" || data.priority === "high") {
      setPriority(data.priority)
    }
  }

  // Loading state
  if (status === "loading") {
    return <p className="p-8">Loading...</p>
  }

  // Not logged in
  if (!session) {
    return (
      <main className="p-8 max-w-lg mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        <p className="text-gray-500 mb-6">To See the TODO Items Please LogIn first!</p>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          LogIn with Google
        </button>
      </main>
    )
  }

  if (loading) return <p className="p-8">Loading todos...</p>

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-2">Todo App</h1>
      <p className="text-gray-500 mb-6">Welcome, {session.user?.name}!</p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo..."
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="border rounded px-3 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={suggestPriority}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          AI ✨
        </button>
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {todos.map(todo => (
        // <TodoItems
        //   key={todo.id}
        //   {...todo}
        //   onComplete={completeTodo}
        //   onDelete={deleteTodo}
        // />
        <TodoItem
          key={todo.id}
          {...todo}
          onComplete={completeTodo}
          onDelete={deleteTodo}

        />
      ))}
    </main>
  )
}