import { IUseCase } from '@/application/usecases/use-case.interface'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'

export class RemoveClientUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientRepository<ClientEntity>,
  ) {}
  async execute(id: string) {
    return await this.clientRepository.deleteClient({ id: id })
  }
}
