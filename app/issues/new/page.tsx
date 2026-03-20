'use client'

import { Button, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssue = () => {
    return (
        <div className='space-y-4'>
            <TextField.Root placeholder='Title' />

            <SimpleMDE placeholder="Description ..." />
            <Button>Submit New Issue</Button>
        </div>

    )
}

export default NewIssue
