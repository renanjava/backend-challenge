import { UserPayload } from '@/application/controllers/user-payload.props'

export interface ITokenGenerate {
  signAsync(payload: UserPayload): Promise<string>
}
