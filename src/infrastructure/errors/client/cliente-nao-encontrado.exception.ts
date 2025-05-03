import { HttpException, HttpStatus } from '@nestjs/common'

export class ClienteNaoEncontradoException extends HttpException {
  constructor(client: string) {
    super(
      `Cliente com o identificador '${client}' não encontrado`,
      HttpStatus.NOT_FOUND,
    )
  }
}
