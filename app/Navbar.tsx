'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import classnames from 'classnames'
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Navbar = () => {
 
    return (
        <nav className=" border-b mb-5 px-5 py-3 h-14 ">
            <Container>
                <Flex justify={'between'}>
                    <Flex gap={'3'} align={'center'}>
                        <Link href="/"><IoBugSharp /></Link>
                        <NavbarLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container>
        </nav>
    )
}



const NavbarLinks = () => {
       const currentpath = usePathname()

    const links = [
        { label: 'Dashboard', url: '/' },
        { label: 'Issues', url: '/issues' }
    ]

  return (
    <ul className="flex items-center space-x-6">
                            {links.map((link) => (
                                <li key={link.url}>
                                    <Link
                                        href={link.url}
                                        className={classnames({
                                            '!text-zinc-700': link.url === currentpath,  
                                            'nav-link':true
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        
  )
}




const AuthStatus = () => {
    const { status, data: session } = useSession()
if(status==='loading') return <Skeleton width={'3rem'}/>
if (status==='unauthenticated')
    return <Link className='nav-link' href={'api/auth/signin'}>Sign In</Link>

    return (
        <Box>
            {status === "authenticated" &&
                (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Avatar src={session.user?.image!} fallback='?' size={'2'} radius='full' className='curser-pointer' />
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
            </Box>

    )
}



export default Navbar