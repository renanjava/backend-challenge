import { Injectable } from '@nestjs/common'
import { DatabaseConnection } from '@/config/database/database.connection'
import { Client, Prisma } from '@prisma/client'

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async client(
    ClientWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: ClientWhereUniqueInput,
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
    })
  }

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({
      data,
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
    })
  }
}
