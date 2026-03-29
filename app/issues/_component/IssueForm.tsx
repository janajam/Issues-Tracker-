'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { IssueSchema } from '@/app/IssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof IssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    })
    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmission, setIsSubmission] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmission(true)
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data)
            else
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
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller name='description' defaultValue={issue?.description} control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description ..." {...field} />}
                />

                <ErrorMessage>{errors.description?.message} </ErrorMessage>
                <Button disabled={isSubmission}>
                    {issue ? 'Update Issue' : 'Submit New Issue'} {' '}
                    {isSubmission && <Spinner />}
                </Button>
            </form >
        </div>

    )
}

export default IssueForm
