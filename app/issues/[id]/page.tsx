import { prisma } from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
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
        <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid >
    )
}

export default IssueDetailsPage
