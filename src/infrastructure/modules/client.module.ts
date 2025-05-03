import { ClientService } from '@/infrastructure/services/client.service'
import { ClientController } from '@/infrastructure/controllers/client.controller'
import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { DocumentModule } from '@/infrastructure/modules/document.module'
import { ConfigModule } from '@nestjs/config'
import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
    forwardRef(() => DocumentModule),
    ConfigModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}
