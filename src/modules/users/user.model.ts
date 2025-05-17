export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  project: string;
}

export interface UserPayload {
  id: string;
  name: string;
  role: string;
}

interface IQueryParams {
  page?: string;
  perPage?: string;
}

export interface IUserQueryParams extends IQueryParams {
  project?: string;
  role?: string;
  sort?: { [key in 'name' | 'project']?: 'asc' | 'desc' };
}
