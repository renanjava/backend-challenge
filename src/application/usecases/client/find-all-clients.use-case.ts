import { IUseCase } from '@/application/usecases/use-case.interface'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'

export class FindAllClientsUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientRepository<ClientEntity>,
  ) {}
  async execute() {
    return await this.clientRepository.clients({})
  }
}
