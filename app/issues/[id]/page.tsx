import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link'


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
                
                <Heading>
                    {issue.title}
                </Heading>
                <Flex className='space-x-5' my={'2'}>
                    <IssueStatusBadge status={issue.status} />
                    <Text>
                        {issue.createdAt.toDateString()}
                    </Text>
                </Flex>
                <Card className='prose' mt={'4'}>
                    <ReactMarkdown>
                        {issue.description}
                    </ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit Issue 
                    </Link>
                </Button>
            </Box>


        </Grid >
    )
}

export default IssueDetailsPage
