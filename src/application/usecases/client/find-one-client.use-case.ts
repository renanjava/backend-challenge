import { ClienteNaoEncontradoError } from '@/application/errors/client/cliente-nao-encontrado.error'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'

export class FindOneClientUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientRepository<ClientEntity>,
  ) {}
  async execute(clientId: string) {
    const clientFounded = await this.clientRepository.client({ id: clientId })
    if (!clientFounded) {
      throw new ClienteNaoEncontradoError(clientId)
    }

    return clientFounded
  }
}
