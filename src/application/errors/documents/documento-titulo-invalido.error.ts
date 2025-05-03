export class DocumentoTituloInvalidoError extends Error {
  constructor() {
    super('Documento não contém título válido')
    this.name = 'DocumentoTituloInvalidoError'
  }
}
