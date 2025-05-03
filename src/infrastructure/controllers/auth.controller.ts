import { AcessToken } from '@/application/services/acess-token.interface'
import { IAuthController } from '@/application/controllers/auth-controller.interface'
import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'
import { AuthService } from '@/infrastructure/services/auth.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController implements IAuthController<SignInDto> {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() signInDto: SignInDto): Promise<AcessToken> {
    return await this.authService.signIn(signInDto)
  }
}
