import { ClientController } from '@/infrastructure/controllers/client.controller'
import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { DocumentModule } from '@/infrastructure/modules/document.module'
import { ConfigModule } from '@nestjs/config'
import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientUseCasesFactory } from '../factories/client-use-cases.factory'
import { BcryptImpl } from '../common/utils/bcrypt-impl'

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
    forwardRef(() => DocumentModule),
    ConfigModule,
  ],
  controllers: [ClientController],
  providers: [
    ClientRepository,
    ClientUseCasesFactory,
    BcryptImpl,
    { provide: 'ClientRepositoryImpl', useExisting: ClientRepository },
    { provide: 'BcryptImpl', useExisting: BcryptImpl },
  ],
  exports: [ClientRepository, ClientUseCasesFactory],
})
export class ClientModule {}
