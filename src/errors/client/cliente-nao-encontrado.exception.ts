import { HttpException, HttpStatus } from '@nestjs/common'

export class ClienteNaoEncontradoException extends HttpException {
  constructor(clientId: string) {
    super(`Cliente com o id ${clientId} não encontrado`, HttpStatus.NOT_FOUND)
  }
}
