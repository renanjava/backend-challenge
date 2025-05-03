import { AuthController } from '@/infrastructure/controllers/auth.controller'
import { AuthService } from '@/infrastructure/services/auth.service'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { BcryptPassword } from '@/infrastructure/common/utils/bcrypt-password'
import { AuthUseCasesFactory } from '../factories/auth/auth-use-cases.factory'
import { ClientRepository } from '../repositories/client.repository'

@Module({
  imports: [
    ClientModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptPassword,
    AuthUseCasesFactory,
    { provide: 'ClientRepository', useExisting: ClientRepository },
    { provide: 'JwtService', useExisting: JwtService },
    { provide: 'BcryptPassword', useExisting: BcryptPassword },
  ],
})
export class AuthModule {}
