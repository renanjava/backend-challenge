import { HttpException, HttpStatus } from '@nestjs/common'

export class DocumentoPdfInvalidoException extends HttpException {
  constructor(tipoDocumento: string) {
    super(
      `O arquivo enviado não é um PDF válido. Tipo recebido: ${tipoDocumento}`,
      HttpStatus.BAD_REQUEST,
    )
  }
}
