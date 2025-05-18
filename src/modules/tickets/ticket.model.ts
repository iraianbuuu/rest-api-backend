import { Status, Priority, WorkType, Project } from '@prisma/client';

export interface TicketRequest {
  title: string;
  workType: WorkType;
  description: string;
  project: Project;
  status: Status;
  priority: Priority;
  createdById: string;
  assignedToId: string;
}

export interface TicketUpdateRequest {
  title?: string;
  workType?: WorkType;
  description?: string;
  status?: Status;
  priority?: Priority;
  createdById?: string;
  assignedToId?: string;
}

export interface IQueryParams {
  page?: string;
  perPage?: string;
}

export interface ITicketQueryParams extends IQueryParams {
  project?: string;
  status?: string;
  priority?: string;
  sort?: { [key in 'project']?: 'asc' | 'desc' };
}
