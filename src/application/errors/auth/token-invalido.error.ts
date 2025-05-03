export class TokenInvalidoError extends Error {
  constructor() {
    super('Token de acesso inválido')
    this.name = 'TokenInvalidoError'
  }
}
