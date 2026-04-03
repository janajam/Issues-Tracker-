'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import classnames from 'classnames'
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navbar = () => {
    const currentpath = usePathname()
    const { status, data: session } = useSession()
    const links = [
        { label: 'Dashboard', url: '/' },
        { label: 'Issues', url: '/issues' }
    ]

    return (
        <nav className=" border-b mb-5 px-5 py-3 h-14 ">
            <Container>
                <Flex justify={'between'}>
                    <Flex gap={'3'} align={'center'}>
                        <Link href="/"><IoBugSharp /></Link>
                        <ul className="flex items-center space-x-6">
                            {links.map((link) => (
                                <li key={link.url}>
                                    <Link
                                        href={link.url}
                                        className={classnames({
                                            'text-zinc-700': link.url === currentpath,
                                            'text-zinc-400': link.url !== currentpath,
                                            'hover:text-zinc-700 transition-colors': true
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Flex>
                        <Box>
                            {status === "authenticated" &&
                                (
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <Avatar src={session.user?.image!} fallback='?' size={'2'} radius='full' />
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content>
                                            <DropdownMenu.Label>
                                                <Text size={'2'}>
                                                    {session.user?.email}
                                                </Text>
                                            </DropdownMenu.Label>
                                            <DropdownMenu.Label>
                                                <DropdownMenu.Item>
                                                    <Link href={'/api/auth/signout'}>Sign Out</Link>
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Label>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                )
                            }
                            {status === 'unauthenticated' && <Link href={'api/auth/signin'}>Sign In</Link>}
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </nav>
    )
}

export default Navbar