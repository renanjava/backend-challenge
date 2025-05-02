import { forwardRef, Module } from '@nestjs/common'
import { ClientService } from '../services/client.service'
import { ClientController } from '../controllers/client.controller'
import { ClientRepository } from '../repositories/client.repository'
import { DatabaseModule } from '@/modules/database.module'
import { JwtModule } from '@nestjs/jwt'
import { DocumentModule } from './document.module'
import { ConfigModule } from '@nestjs/config'

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
