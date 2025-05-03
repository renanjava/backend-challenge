import { CreateClientUseCase } from '@/application/usecases/client/create-client.use-case'
import { FindAllClientsUseCase } from '@/application/usecases/client/find-all-clients.use-case'
import { FindOneClientUseCase } from '@/application/usecases/client/find-one-client.use-case'
import { RemoveClientUseCase } from '@/application/usecases/client/remove-client.use-case'
import { UpdateClientUseCase } from '@/application/usecases/client/update-client.use-case'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ClientUseCasesFactory {
  constructor(
    @Inject('ClientRepositoryImpl')
    private readonly clientRepository: IClientRepository<ClientEntity>,
  ) {}

  getCreateClientUseCaseInstance(): CreateClientUseCase {
    return new CreateClientUseCase(this.clientRepository)
  }

  getFindOneClientUseCaseInstance(): FindOneClientUseCase {
    return new FindOneClientUseCase(this.clientRepository)
  }

  getFindAllClientsUseCaseInstance(): FindAllClientsUseCase {
    return new FindAllClientsUseCase(this.clientRepository)
  }

  getUpdateClientUseCaseInstance(): UpdateClientUseCase {
    return new UpdateClientUseCase(this.clientRepository)
  }

  getRemoveClientUseCaseInstance(): RemoveClientUseCase {
    return new RemoveClientUseCase(this.clientRepository)
  }
}
