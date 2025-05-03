import { CreateClientInput } from '@/application/dtos/client/create-client.input'
import { EmailJaCadastradoError } from '@/application/errors/client/email-ja-cadastrado.exception'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'

export class CreateClientUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientRepository<ClientEntity>,
  ) {}
  async execute(createClientInput: CreateClientInput) {
    const emailFounded = await this.clientRepository.client({
      email: createClientInput.email,
    })
    if (emailFounded) {
      throw new EmailJaCadastradoError(createClientInput.email)
    }

    return await this.clientRepository.createClient(createClientInput)
  }
}
