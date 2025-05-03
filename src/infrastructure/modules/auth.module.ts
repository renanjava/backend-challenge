import { AuthController } from '@/infrastructure/controllers/auth.controller'
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
    AuthUseCasesFactory,
    BcryptImpl,
    { provide: 'ClientRepositoryImpl', useExisting: ClientRepository },
    { provide: 'JwtServiceImpl', useExisting: JwtService },
    { provide: 'BcryptImpl', useExisting: BcryptImpl },
  ],
  exports: [BcryptImpl],
})
export class AuthModule {}
