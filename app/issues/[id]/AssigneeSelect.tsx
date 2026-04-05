'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Toaster,toast } from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then(res => res.data)
    })

    if (error) return null;

    if (isLoading) return <Skeleton />

    return (
        <>
            <Select.Root
                defaultValue={issue.assignToUserId || "unassicgned"}
                onValueChange={(userId) => {
                    axios.patch('/api/issues/' + issue.id, {
                        assignToUserId: userId === "unassigned" ? null : userId
                    }).catch(()=>{
                        toast.error('changes could not be saved')
                    })
                }}>
                <Select.Trigger placeholder='Assignee' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestion</Select.Label>
                        <Select.Item value="unassicgned">Unassigned</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        )
                        )}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect
