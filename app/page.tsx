"use client"

import { useEffect, useState } from "react"
import TodoItem from "./components/TodoItems"

interface Todo {
  id: number
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        setLoading(false)
      })
  }, [])

  // const addTodo = () => {
  //   if (title.trim() === "") return
  //   const newTodo: Todo = {
  //     id: Date.now(),
  //     title,
  //     completed: false,
  //     priority
  //   }
  //   setTodos([...todos, newTodo])
  //   setTitle("")
  // }
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
  const addTodo = async () => {
    if (title.trim() === "") return

    const res = await fetch("api/todos", {
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

  if (loading) return <p className="p-8 text-2xl text-green-500 text-center">Loading...</p>

  const deleteTodo = async (id: number) => {
    await fetch(`/api/tods/${id}`, {
      method: "DELETE",
    })
    setTodos(todos.filter(todo => todo.id !== id))
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
      <button
        onClick={suggestPriority}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        AI Priority✨
      </button>
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
          onDelete={deleteTodo}
        />
      ))}
    </main>
  )
}