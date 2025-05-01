import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { ClientRepository } from './client.repository'
import { DatabaseModule } from '@/config/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
