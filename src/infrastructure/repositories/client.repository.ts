import { Injectable } from '@nestjs/common'
import { DatabaseConnection } from '@/infrastructure/config/database/database.connection'
import { Client, Prisma } from '@prisma/client'
import { IClientRepository } from '@/domain/repositories/client.repository'

@Injectable()
export class ClientRepository implements IClientRepository<Client> {
  constructor(private readonly prisma: DatabaseConnection) {}

  async client(
    ClientWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: ClientWhereUniqueInput,
      include: { documents: true },
    })
  }

  async clients(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ClientWhereUniqueInput
    where?: Prisma.ClientWhereInput
    orderBy?: Prisma.ClientOrderByWithRelationInput
  }): Promise<Client[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: { documents: true },
        },
      },
    })
  }

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({
      data,
      include: { documents: true },
    })
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput
    data: Prisma.ClientUpdateInput
  }): Promise<Client> {
    const { where, data } = params
    return this.prisma.client.update({
      data,
      where,
    })
  }

  async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({
      where,
      include: { documents: true },
    })
  }
}
