/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from '@/services/auth.service'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    //return this.authService.signIn(signInDto.username, signInDto.password)
  }
}
