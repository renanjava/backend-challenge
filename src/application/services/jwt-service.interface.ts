import { UserPayload } from '../controllers/user-payload.props'

export interface IJwtService {
  signAsync(payload: UserPayload): Promise<string>
}
