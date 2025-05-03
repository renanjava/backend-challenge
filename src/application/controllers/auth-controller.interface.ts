import { AcessToken } from '@/application/services/acess-token.interface'

export interface IAuthController<T> {
  login(data: T): Promise<AcessToken>
}
