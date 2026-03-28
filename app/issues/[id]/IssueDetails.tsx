
import { Heading, Flex, Card ,Text} from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import { Issue } from '@prisma/client'

const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <>
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
             
    </>
  )
}

export default IssueDetails
