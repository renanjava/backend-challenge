import { Request } from 'express'
import { UserPayload } from './user-payload.props'

export interface UserRequest extends Request {
  user: UserPayload
}
