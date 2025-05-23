import { UserPayload } from '@/application/controllers/user-payload.props'
import { Request } from 'express'

export interface UserRequest extends Request {
  user: UserPayload
}
