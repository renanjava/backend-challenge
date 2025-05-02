import { Module } from '@nestjs/common'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { ClientModule } from './client.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [ClientModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
