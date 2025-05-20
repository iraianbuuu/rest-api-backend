import { z } from "zod";

export const createCommentSchema = z.object({
    comment: z.string({
        required_error: 'Comment is required',
        invalid_type_error: 'Comment must be a string',
    }).min(1, {
        message: 'Comment must be at least 1 character long',
    }),
});

export const commentIdSchema = z.object({
    id : z.string().uuid({
        message : 'Comment Id must be a valid UUID',
    })
})