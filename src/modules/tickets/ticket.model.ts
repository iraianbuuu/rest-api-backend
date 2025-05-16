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
