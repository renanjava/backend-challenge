export class DocumentoPdfInvalidoError extends Error {
  constructor(tipoDocumento: string) {
    super(
      `O arquivo enviado não é um PDF válido. Tipo recebido: ${tipoDocumento}`,
    )
    this.name = 'DocumentoPdfInvalidoException'
  }
}
