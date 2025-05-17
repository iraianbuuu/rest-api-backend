import { IUserQueryParams } from './user.model';

const sortByFields = ['name', 'project'];
const sortByDirections = ['asc', 'desc'];

export function parseUserSortByQueryParams(sortByParams: string) {
  let sortBy: IUserQueryParams['sort'] = {};
  if (typeof sortByParams === 'string') {
    const [field, direction] = sortByParams.split(':');
    if (sortByFields.includes(field) && sortByDirections.includes(direction)) {
      sortBy = { [field]: direction as 'asc' | 'desc' };
    }
  }
  return sortBy;
}
