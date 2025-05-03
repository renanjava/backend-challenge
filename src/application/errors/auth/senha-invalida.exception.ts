export class SenhaInvalidaError extends Error {
  constructor() {
    super('Senha inválida')
    this.name = 'SenhaInvalidaException'
  }
}
