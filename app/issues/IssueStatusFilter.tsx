'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const statuses :{lable : string , value ?: Status}[]=[
    {lable: 'All'},
    {lable:'Open' , value:'OPEN'},
    {lable : 'InProgress', value:'INPROGRESS'},
    {lable :'Closed' , value:'CLOSED'}
]
const IssueStatusFilter = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Filter By Status ...'/>
        <Select.Content>
            {
                statuses.map(status=>
                    <Select.Item key={status.value} value={status.value || " "}>
                        {status.lable}
                    </Select.Item>
                )
            }
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
