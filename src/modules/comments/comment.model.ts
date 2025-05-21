export interface CommentRequest{
    comment: string;
}

export interface IQueryParams {
    page?: string;
    perPage?: string;
}

export interface ICommentQueryParams extends IQueryParams {}