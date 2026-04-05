import { authOptions } from "@/app/auth/authOptions";
import { IssueSchema, PatchIssueSchema } from "@/app/IssueSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {
            const session=await getServerSession(authOptions)
            if(!session)
                return NextResponse.json({},{status:401})
            
    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    const{assignToUserId,title,description}=body

    if(assignToUserId){
        const user=await prisma.user.findUnique({
            where:{
                id:assignToUserId
            }
        })

        if(!user)
            return NextResponse.json({error:"invalid user"},{status:400})
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        return NextResponse.json({ error: "invalid issue" }, { status: 404 })

    const updateIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title,
            description,
            assignToUserId
        }
    })

    return NextResponse.json(updateIssue)
}




export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
        
    const session=await getServerSession(authOptions)
    if(!session)
        return NextResponse.json({},{status:401})
    
       const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        return NextResponse.json({ error: "invalid issue" }, { status: 404 })

    const deleteIssue = await prisma.issue.delete({
        where: {
            id: issue.id
        },

    })

    return NextResponse.json('delete is success')
}
