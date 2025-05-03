import { HttpException, HttpStatus } from '@nestjs/common'

export class DocumentoTituloInvalidoException extends HttpException {
  constructor() {
    super('Documento não contém título válido', HttpStatus.BAD_REQUEST)
  }
}
