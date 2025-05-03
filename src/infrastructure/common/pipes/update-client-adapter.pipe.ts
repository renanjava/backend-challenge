import { Injectable, PipeTransform } from '@nestjs/common'
import { ClientAdapter } from '@/infrastructure/adapters/client.adapter'
import { UpdateClientDto } from '@/infrastructure/dtos/client/update-client.dto'

@Injectable()
export class UpdateClientAdapterPipe implements PipeTransform {
  transform(updateClientDto: UpdateClientDto) {
    return ClientAdapter.updateDtoToInput(updateClientDto)
  }
}
