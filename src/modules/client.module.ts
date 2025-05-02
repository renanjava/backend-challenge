import { Module } from '@nestjs/common'
import { ClientService } from '../services/client.service'
import { ClientController } from '../controllers/client.controller'
import { ClientRepository } from '../repositories/client.repository'
import { DatabaseModule } from '@/modules/database.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}
