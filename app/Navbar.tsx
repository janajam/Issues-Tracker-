
import Link from 'next/link'
import React from 'react'
import { IoBugSharp } from "react-icons/io5";

const Navbar = () => {
    const links = [
        { label: 'Dashboard', url: '/' },
        { label: 'Issues', url: '/issues' }
    ]

    return (
        <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">

            <Link href="/"><IoBugSharp /></Link>

            <ul className="flex items-center space-x-6">
                {links.map((link) => (
                    <li key={link.url}>
                        <Link
                            href={link.url}
                            className="text-zinc-400 hover:text-zinc-700"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Navbar