import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'

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
        <div>
            <p>
                {issue.title}
            </p>
            <p>
                {issue.description}
            </p>
            <p>
                {issue.status}
            </p>
            <p>
                {issue.createdAt.toDateString()}
            </p>
        </div>
    )
}

export default IssueDetailsPage
