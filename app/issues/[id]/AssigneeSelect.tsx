'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const AssigneeSelect = () => {

  const {data:users,error,isLoading}= useQuery({
        queryKey:['users'],
        queryFn:()=>axios.get<User[]>('/api/users').then(res=>res.data)
    })
    
    if(error) return null;

    if(isLoading) return <Skeleton/>

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assignee' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    )
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
