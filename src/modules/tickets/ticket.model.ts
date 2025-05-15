import { Status, Priority ,  WorkType, Project } from "@prisma/client";

export interface TicketRequest {
    title: string;  
    workType: WorkType;
    description: string;
    project: Project;
    assigneeId: string;
    status: Status;
    priority: Priority;
    createdBy: string;
    createdById: string;
    assignedTo: string;
    assignedToId: string;
}
