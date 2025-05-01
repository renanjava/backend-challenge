import { HttpException, HttpStatus } from '@nestjs/common'

export class DocumentoNaoEncontradoException extends HttpException {
  constructor(documentId: string) {
    super(
      `Documento com o id ${documentId} não encontrado`,
      HttpStatus.NOT_FOUND,
    )
  }
}
