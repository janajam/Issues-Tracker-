'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/IssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import IssueForm from '../_component/IssueForm';

const SimpleMDE= dynamic(
    ()=>import('react-simplemde-editor'),
    {ssr:false}
)
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssue = () => {

    return (
       <IssueForm/>
    )
}

export default NewIssue
