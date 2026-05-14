import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import Link from '../components/Link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueAction from './IssueAction'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'


interface Props {
  searchParams: { status?: Status, orderBy?: keyof Issue}
}

const columns : {label: string , value: keyof Issue , className?: string}[]= [
  { label: 'Issues' ,value: 'title'},
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
]

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const statuses = Object.values(Status)
  const status = statuses.includes(params.status!)
    ? params.status
    : undefined

    const orderBy= params.orderBy
    ?{[params.orderBy]:'asc'}
    :undefined

  const issues = await prisma.issue.findMany(
    {
      where: {
        status
      },
      orderBy
    }
  );
  await delay(2000);

  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {
              columns.map(column => (
                <Table.ColumnHeaderCell
                  key={column.value} className={column.className}>
                    <NextLink href={
                      {
                        query:{
                          ...(params.status && { status: params.status }),
                          orderBy: column.value
                        }
                      }}>
                         {column.label}
                    </NextLink>
                  {column.value=== searchParams.orderBy && <ArrowUpIcon className='inline'/>}
                </Table.ColumnHeaderCell>
              ))
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage
