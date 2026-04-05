import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(3,'title is required').max(255),
    description: z.string().min(1,'description is required')
})



export const PatchIssueSchema = z.object({
    title: z.string().min(3,'title is required').max(255).optional(),
    description: z.string().min(1,'description is required').optional(),
    assignToUserId: z.string().min(1,"assignedToUserId is required").optional().nullable()
})
