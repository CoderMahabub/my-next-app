interface TodoItemProps {
    id: number
    title: string
    completed: boolean
    priority: "low" | "medium" | "high"
    onComplete: (id: number) => void
    onDelete: (id: number) => void
}

export default function TodoItem({ id, title, completed, priority, onComplete, onDelete }: TodoItemProps) {
    return (
        <div className="p-4 border rounded-lg mb-2 flex justify-between items-center">
            <div>
                <h2 className={`text-lg font-semibold ${completed ? "line-through text-gray-400" : ""}`}>
                    {title}
                </h2>
                <p className="text-sm text-gray-500">Priority: {priority}</p>
            </div>
            {!completed && (
                <button
                    onClick={() => onComplete(id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Done
                </button>
            )}

            <button
                onClick={() => onDelete(id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 font:semibold"
            >
                Delete
            </button>
            {/* {completed && <span>✅</span>} */}
        </div>
    )
}