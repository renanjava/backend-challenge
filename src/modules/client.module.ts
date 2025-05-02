import { Module } from '@nestjs/common'
import { ClientService } from '../services/client.service'
import { ClientController } from '../controllers/client.controller'
import { ClientRepository } from '../repositories/client.repository'
import { DatabaseModule } from '@/modules/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}
