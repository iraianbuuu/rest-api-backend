import { Project, Role } from '@prisma/client';
import UserRepository from './user.repository';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '../../exceptions/custom.exception';
import { IUserQueryParams } from './user.model';

const userRepository = new UserRepository();

class UserService {
  findUserById = async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`Account with id: ${id} not found`);
    }
    return user;
  };

  updateUserById = async (
    id: string,
    name: string,
    email: string,
    role: Role,
    project: Project,
  ) => {
    const user = await this.findUserById(id);

    // Role and project constraints
    if (
      user.role === Role.ADMIN ||
      user.role === Role.TECH_LEAD ||
      role === Role.ADMIN ||
      role === Role.TECH_LEAD
    ) {
      throw new ForbiddenException(
        'Admin or Tech Lead cannot be updated by normal user',
      );
    }

    if (user.project !== project) {
      throw new BadRequestException(
        "Project is not the same as the user's project",
      );
    }

    return await userRepository.updateUserById(id, name, email, role, project);
  };

  deleteUserById = async (id: string, role: Role) => {
    const user = await this.findUserById(id);

    if (role === 'TECH_LEAD' && user.role === 'ADMIN') {
      throw new BadRequestException(
        'Tech Lead cannot delete the Admin account',
      );
    }

    return await userRepository.deleteUserById(id);
  };

  getUsers = async (
    role: Role,
    id: string,
    queryParams: IUserQueryParams = {},
    limit: number,
    offset: number,
  ) => {
    const techLead = await this.findUserById(id);
    if (!techLead) {
      throw new NotFoundException(`Account with id: ${id} not found`);
    }
    // If the user is a tech lead
    if (role === 'TECH_LEAD') {
      const project = techLead.project;
      if (
        (queryParams.project && queryParams.project !== project) ||
        (queryParams.role && queryParams.role === 'ADMIN')
      ) {
        throw new BadRequestException('User is not authorized to access');
      }
      if (!queryParams.role || !queryParams.project) {
        queryParams.role = role;
        queryParams.project = project;
      }
    }

    return await userRepository.getUsers(queryParams, limit, offset);
  };
}

export default UserService;
