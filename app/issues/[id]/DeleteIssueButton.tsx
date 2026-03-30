'use client'
import Spinner from '@/app/components/Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import delay from 'delay'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteIssue = async () => {
        try {
            setIsDeleting(true)
            console.log(isDeleting)
            await delay(2000)

            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
        }
        catch (error) {
            setError(true)
            setIsDeleting(false)
        }
    }
    return (
        <><AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red' disabled={isDeleting}>Delete Issue
                    {isDeleting && <Spinner />}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm Delete Issue
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue ? the action cannot be undone
                </AlertDialog.Description>
                <Flex gap={'4'} mt={'4'}>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={deleteIssue} >
                            Delete Issue </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        this issue could not be deleted
                    </AlertDialog.Description>
                    <Button color='gray' variant='soft' mt={'2'} onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
