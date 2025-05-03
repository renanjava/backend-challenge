import { DatabaseConnection } from '@/infrastructure/config/database/database.connection'
import { IDocumentRepository } from '@/domain/repositories/document.repository'
import { Document, Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DocumentRepository implements IDocumentRepository<Document> {
  constructor(private readonly prisma: DatabaseConnection) {}

  async document(
    DocumentWhereUniqueInput: Prisma.DocumentWhereUniqueInput,
  ): Promise<Document | null> {
    return this.prisma.document.findUnique({
      where: DocumentWhereUniqueInput,
      include: { client: true },
    })
  }

  async documents(params: {
    skip?: number
    take?: number
    cursor?: Prisma.DocumentWhereUniqueInput
    where?: Prisma.DocumentWhereInput
    orderBy?: Prisma.DocumentOrderByWithRelationInput
  }): Promise<Document[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.document.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { client: true },
    })
  }

  async createDocument(data: Prisma.DocumentCreateInput): Promise<Document> {
    return this.prisma.document.create({
      data,
      include: { client: true },
    })
  }

  async updateDocument(params: {
    where: Prisma.DocumentWhereUniqueInput
    data: Prisma.DocumentUpdateInput
  }): Promise<Document> {
    const { where, data } = params
    return this.prisma.document.update({
      data,
      where,
      include: { client: true },
    })
  }

  async deleteDocument(
    where: Prisma.DocumentWhereUniqueInput,
  ): Promise<Document> {
    return this.prisma.document.delete({
      where,
      include: { client: true },
    })
  }
}
