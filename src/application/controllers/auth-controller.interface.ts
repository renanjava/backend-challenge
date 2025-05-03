import { AcessToken } from '../services/acess-token.interface'

export interface IAuthController<T> {
  login(data: T): Promise<AcessToken>
}
