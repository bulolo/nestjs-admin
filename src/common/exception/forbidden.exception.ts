import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.FORBIDDEN,
      error: 'Forbidden',
    }, HttpStatus.FORBIDDEN);
    // super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

