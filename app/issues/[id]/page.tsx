import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'


const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {

    await delay(1000)
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial:'1', md:'2' }} gap={'5'}>
            <Box>
                <IssueDetails issue={issue} />            
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id}/>
              </Box>


        </Grid >
    )
}

export default IssueDetailsPage
