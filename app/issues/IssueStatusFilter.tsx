'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses :{lable : string , value : string}[]=[
    {lable: 'All', value: 'ALL' },
    {lable:'Open' , value:'OPEN'},
    {lable : 'InProgress', value:'INPROGRESS'},
    {lable :'Closed' , value:'CLOSED'}
]

const IssueStatusFilter = () => {
    const router =useRouter()
  return (
   <Select.Root
  onValueChange={(status) => {
    const query =
      status === 'ALL'
        ? ''
        : `?status=${status}`

    router.push(`/issues${query}`)
  }}
>
  <Select.Trigger placeholder="Filter By Status..." />

  <Select.Content>
    {statuses.map((status) => (
      <Select.Item
        key={status.lable}
        value={status.value}
      >
        {status.lable}
      </Select.Item>
    ))}
  </Select.Content>
</Select.Root>
  )
}

export default IssueStatusFilter
