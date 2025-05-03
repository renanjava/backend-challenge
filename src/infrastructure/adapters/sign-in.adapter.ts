import { SignInInput } from '@/application/dtos/auth/sign-in.input'
import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'

export abstract class SignInAdapter {
  static dtoToInput(dto: SignInDto): SignInInput {
    return new SignInInput(dto.email, dto.password)
  }
}
