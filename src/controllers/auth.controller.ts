import { SignInDto } from '@/dtos/auth/sign-in.dto'
import { AuthService } from '@/services/auth.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }
}
