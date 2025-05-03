import { AuthController } from '@/infrastructure/controllers/auth.controller'
import { AuthService } from '@/infrastructure/services/auth.service'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { BcryptImpl } from '@/infrastructure/common/utils/bcrypt-impl'
import { AuthUseCasesFactory } from '@/infrastructure/factories/auth-use-cases.factory'
import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

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
    AuthUseCasesFactory,
    { provide: 'ClientRepositoryImpl', useExisting: ClientRepository },
    { provide: 'JwtServiceImpl', useExisting: JwtService },
    { provide: 'BcryptImpl', useClass: BcryptImpl },
  ],
})
export class AuthModule {}
