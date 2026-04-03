import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-800 text-white flex gap-6">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/about" className="hover:text-gray-300">About</Link>
            <Link href="/todos" className="hover:text-gray-300">Todos</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>
    )
}