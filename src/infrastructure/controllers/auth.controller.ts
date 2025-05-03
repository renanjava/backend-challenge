import { AcessToken } from '@/application/services/acess-token.interface'
import { IAuthController } from '@/application/controllers/auth-controller.interface'
import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'
import { AuthUseCasesFactory } from '@/infrastructure/factories/auth-use-cases.factory'
import { SignInAdapterPipe } from '@/infrastructure/common/pipes/sign-in-dto-to-input.pipe'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController implements IAuthController<SignInDto> {
  constructor(private readonly authUseCasesFactory: AuthUseCasesFactory) {}
  @Post('login')
  async login(
    @Body(SignInAdapterPipe) signInInput: SignInDto,
  ): Promise<AcessToken> {
    const signInUseCase = this.authUseCasesFactory.getSignInUseCaseInstance()
    return await signInUseCase.execute(signInInput)
  }
}
