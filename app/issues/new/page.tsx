'use client'

import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
    title: string,
    description: string
}

const NewIssue = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter()
    const [error, setError]=useState('')

    return (
        <div className='max-w-xl'>
            {error&& 
                <Callout.Root color='red' className='my-3'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className='space-y-4'
                onSubmit={handleSubmit(async (data) => {
                    try{
                        
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                    }
                    catch(error){
                        setError('an unexpected error occurred')
                    }
                })}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <Controller name='description' control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description ..." {...field} />}
                />
                <Button>Submit New Issue</Button>
            </form >
        </div>

    )
}

export default NewIssue
