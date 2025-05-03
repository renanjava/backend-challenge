import { AcessToken } from '@/application/services/acess-token.interface'
import { IAuthController } from '@/application/controllers/auth-controller.interface'
import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthUseCasesFactory } from '../factories/auth/auth-use-cases.factory'

@Controller('auth')
export class AuthController implements IAuthController<SignInDto> {
  constructor(private readonly authUseCasesFactory: AuthUseCasesFactory) {}
  @Post('login')
  async login(@Body() signInDto: SignInDto): Promise<AcessToken> {
    const signInUseCase = this.authUseCasesFactory.getSignInUseCaseInstance()
    return await signInUseCase.execute(signInDto)
  }
}
