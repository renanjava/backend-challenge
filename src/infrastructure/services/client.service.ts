import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { UpdateClientDto } from '@/infrastructure/dtos/client/update-client.dto'
import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { ClienteNaoEncontradoException } from '@/infrastructure/errors/client/cliente-nao-encontrado.exception'
import { EmailJaCadastradoException } from '@/infrastructure/errors/client/email-ja-cadastrado.exception'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}
  async create(createClientDto: CreateClientDto) {
    const emailFounded = await this.clientRepository.client({
      email: createClientDto.email,
    })
    if (emailFounded) {
      throw new EmailJaCadastradoException(createClientDto.email)
    }

    return await this.clientRepository.createClient(createClientDto)
  }

  async findAll() {
    return await this.clientRepository.clients({})
  }

  async findOne(id: string) {
    const clientFounded = await this.clientRepository.client({ id: id })
    if (!clientFounded) {
      throw new ClienteNaoEncontradoException(id)
    }

    return clientFounded
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.findOne(id)

    return await this.clientRepository.updateClient({
      where: { id: id },
      data: updateClientDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)
    return await this.clientRepository.deleteClient({ id: id })
  }
}
