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
