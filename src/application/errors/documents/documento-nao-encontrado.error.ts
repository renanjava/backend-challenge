export class DocumentoNaoEncontradoError extends Error {
  constructor(documentId: string) {
    super(`Documento com o id ${documentId} não encontrado`)
    this.name = 'DocumentoNaoEncontradoException'
  }
}
