export class DocumentoConteudoInvalidoError extends Error {
  constructor() {
    super('Documento não contém conteúdo válido')
    this.name = 'DocumentoConteudoInvalidoException'
  }
}
