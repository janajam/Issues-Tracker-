'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import classnames from 'classnames'
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const Navbar = () => {
    const currentpath = usePathname()
    const {status,data:session}=useSession()
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
                            className={classnames({
                                'text-zinc-700': link.url === currentpath,
                                'text-zinc-400': link.url !== currentpath,
                                'hover:text-zinc-700 transition-colors':true
                            })}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
<Box>
    {status==="authenticated" && <Link href={'/api/auth/signout'}>Sign Out</Link>}
    {status==='unauthenticated' &&<Link href={'api/auth/signin'}>Sign In</Link>}
</Box>
        </nav>
    )
}

export default Navbar