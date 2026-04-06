import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-6 bg-gray-900 text-gray-400 border-t border-gray-800">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Todo App</span>. All rights reserved.
                </p>

                <div className="flex gap-6 text-sm">
                    <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="/about" className="hover:text-gray-300">About</Link>
                    <Link href="/todos" className="hover:text-gray-300">Todos</Link>
                    <Link href="/contact" className="hover:text-gray-300">Contact</Link>
                </div>
            </div>
        </footer>
    )
}