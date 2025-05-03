export class EmailJaCadastradoError extends Error {
  constructor(clientEmail: string) {
    super(`Email '${clientEmail}' já cadastrado`)
    this.name = 'EmailJaCadastradoException'
  }
}
