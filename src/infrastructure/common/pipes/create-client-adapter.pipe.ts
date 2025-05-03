import { Injectable, PipeTransform } from '@nestjs/common'
import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { ClientAdapter } from '@/infrastructure/adapters/client.adapter'

@Injectable()
export class CreateClientAdapterPipe implements PipeTransform {
  transform(createClientDto: CreateClientDto) {
    return ClientAdapter.createDtoToInput(createClientDto)
  }
}
