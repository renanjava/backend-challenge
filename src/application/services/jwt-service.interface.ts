import { UserPayload } from '@/application/controllers/user-payload.props'

export interface IJwtService {
  signAsync(payload: UserPayload): Promise<string>
}
