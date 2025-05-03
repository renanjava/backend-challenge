import { HttpException, HttpStatus } from '@nestjs/common'

export class TokenInvalidoException extends HttpException {
  constructor() {
    super('Token de acesso inválido', HttpStatus.UNAUTHORIZED)
  }
}
