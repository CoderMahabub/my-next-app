"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <div className="flex gap-6">
                <Link href="/" className="hover:text-gray-300">Home</Link>
                <Link href="/about" className="hover:text-gray-300">About</Link>
                <Link href="/todos" className="hover:text-gray-300">Todos</Link>
                <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            </div>

            <div>
                {session ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm">{session.user?.name}</span>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 px-3 py-2 rounded text-sm hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="bg-blue-500 px-3 py-2 rounded text-sm hover:bg-blue-600"
                    >
                        Login with Google
                    </button>
                )}
            </div>
        </nav>
    )
}