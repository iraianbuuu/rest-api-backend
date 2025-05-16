import { StatusCode } from '../utils/status-code';
import { GlobalException, ErrorType } from './global.exception';

export class BadRequestException extends GlobalException {
  constructor(message: string = 'Bad Request. The request is invalid.') {
    super(ErrorType.BAD_REQUEST, StatusCode.BAD_REQUEST, message);
  }
}

export class UnauthorizedException extends GlobalException {
  constructor(
    message: string = 'Unauthorized. The request is not authorized.',
  ) {
    super(ErrorType.UNAUTHORIZED, StatusCode.UNAUTHORIZED, message);
  }
}

export class ForbiddenException extends GlobalException {
  constructor(message: string = 'Forbidden. The request is forbidden.') {
    super(ErrorType.FORBIDDEN, StatusCode.FORBIDDEN, message);
  }
}

export class NotFoundException extends GlobalException {
  constructor(message: string = 'Not Found. The request is not found.') {
    super(ErrorType.NOT_FOUND, StatusCode.NOT_FOUND, message);
  }
}

export class InternalServerErrorException extends GlobalException {
  constructor(
    message: string = 'Internal Server Error. The request is not processed.',
  ) {
    super(
      ErrorType.INTERNAL_SERVER_ERROR,
      StatusCode.INTERNAL_SERVER_ERROR,
      message,
    );
  }
}
