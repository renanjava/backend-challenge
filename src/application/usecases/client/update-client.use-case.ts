import { UpdateClientInput } from '@/application/dtos/client/update-client.input'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'

export class UpdateClientUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientRepository<ClientEntity>,
  ) {}
  async execute(id: string, updateClientInput: UpdateClientInput) {
    return await this.clientRepository.updateClient({
      where: { id: id },
      data: updateClientInput,
    })
  }
}
