import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'
import { SignInAdapter } from '@/infrastructure/adapters/auth/sign-in.adapter'
import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class SignInDtoToInputPipe implements PipeTransform {
  transform(signInDto: SignInDto) {
    return SignInAdapter.dtoToInput(signInDto)
  }
}
