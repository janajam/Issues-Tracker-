'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE= dynamic(
    ()=>import('react-simplemde-editor'),
    {ssr:false}
)
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssue = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmission, setIsSubmission] = useState(false)
    
    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmission(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
        }
        catch (error) {
            setIsSubmission(false)
            setError('an unexpected error occurred')
        } 
    })

    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color='red' className='my-3'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className='space-y-4'
                onSubmit={onSubmit}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller name='description' control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description ..." {...field} />}
                />

                <ErrorMessage>{errors.description?.message} </ErrorMessage>
                <Button disabled={isSubmission}>Submit New Issue {isSubmission && <Spinner />}</Button>
            </form >
        </div>

    )
}

export default NewIssue
