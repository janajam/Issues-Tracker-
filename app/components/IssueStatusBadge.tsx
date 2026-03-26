import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes';
import React from 'react'

const statusMap: Record<
    Status,
    { lable: string, color: 'red' | 'violet' | 'green' }
> = {
    OPEN: { lable: 'open', color: 'red' },
    INPROGRESS: { lable: 'in progress', color: 'violet' },
    CLOSED: { lable: 'closed', color: 'green' }
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].lable}
        </Badge>
    )
}

export default IssueStatusBadge
