import { UserPayload } from '@/application/contracts/user-payload.props'
import { Request } from 'express'

export interface UserRequest extends Request {
  user: UserPayload
}
