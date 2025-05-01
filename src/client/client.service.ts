import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientRepository } from './client.repository'
import { ClienteNaoEncontradoException } from '@/exceptions/cliente-nao-encontrado.exception'
import { EmailJaCadastradoException } from '@/exceptions/email-ja-cadastrado.exception'

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
