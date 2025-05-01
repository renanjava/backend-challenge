import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientRepository } from './client.repository'

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}
  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.createClient(createClientDto)
  }

  async findAll() {
    return await this.clientRepository.clients({})
  }

  async findOne(id: string) {
    const clientFounded = await this.clientRepository.client({ id: id })
    if (!clientFounded) {
      throw new NotFoundException('Cliente não encontrado')
    }

    return clientFounded
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const clientFounded = await this.findOne(id)
    if (!clientFounded) {
      throw new NotFoundException('Cliente não encontrado')
    }

    return await this.clientRepository.updateClient({
      where: { id: id },
      data: updateClientDto,
    })
  }

  async remove(id: string) {
    const clientFounded = await this.findOne(id)
    if (!clientFounded) {
      throw new NotFoundException('Cliente não encontrado')
    }

    return await this.clientRepository.deleteClient({ id: id })
  }
}
