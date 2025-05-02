import { HttpException, HttpStatus } from '@nestjs/common'

export class SenhaInvalidaException extends HttpException {
  constructor() {
    super('Senha inválida', HttpStatus.UNAUTHORIZED)
  }
}
