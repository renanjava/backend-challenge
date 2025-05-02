import { HttpException, HttpStatus } from '@nestjs/common'

export class DocumentoConteudoInvalidoException extends HttpException {
  constructor() {
    super('Documento não contém conteúdo válido', HttpStatus.BAD_REQUEST)
  }
}
