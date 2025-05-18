import { ITicketQueryParams } from './ticket.model';

const sortByFields = ['project'];
const sortByDirections = ['asc', 'desc'];

export function parseTicketSortByQueryParams(sortByParams: string) {
  let sortBy: ITicketQueryParams['sort'] = {};
  if (typeof sortByParams === 'string') {
    const [field, direction] = sortByParams.split(':');
    if (sortByFields.includes(field) && sortByDirections.includes(direction)) {
      sortBy = { [field]: direction as 'asc' | 'desc' };
    }
  }
  return sortBy;
}

export const statusTransition = {
  TODO: ['IN_PROGRESS'],
  IN_PROGRESS: ['PEER_REVIEW', 'TODO'],
  PEER_REVIEW: ['READY_FOR_QA', 'IN_PROGRESS'],
  READY_FOR_QA: ['DONE', 'IN_PROGRESS'],
  DONE: [''],
};
