import { CreateClientInput } from '@/application/dtos/client/create-client.input'
import { CreateClientDto } from '../dtos/client/create-client.dto'
import { UpdateClientDto } from '../dtos/client/update-client.dto'
import { UpdateClientInput } from '@/application/dtos/client/update-client.input'

export abstract class ClientAdapter {
  static createDtoToInput(dto: CreateClientDto): CreateClientInput {
    return new CreateClientInput(dto.email, dto.name, dto.password)
  }

  static updateDtoToInput(dto: UpdateClientDto): UpdateClientInput {
    return new UpdateClientInput(dto.name, dto.email, dto.password)
  }
}
