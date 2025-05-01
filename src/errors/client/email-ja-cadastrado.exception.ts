import { HttpException, HttpStatus } from '@nestjs/common'

export class EmailJaCadastradoException extends HttpException {
  constructor(clientEmail: string) {
    super(`Email '${clientEmail}' já cadastrado`, HttpStatus.CONFLICT)
  }
}
