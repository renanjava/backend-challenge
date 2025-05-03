export class ClienteNaoEncontradoError extends Error {
  constructor(client: string) {
    super(`Cliente com o identificador '${client}' não encontrado`)
    this.name = 'ClienteNaoEncontradoException'
  }
}
