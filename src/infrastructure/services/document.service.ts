import { DocumentRepository } from '@/infrastructure/repositories/document.repository'
import { CreateDocumentDto } from '@/infrastructure/dtos/document/create-document.dto'
import { UpdateDocumentDto } from '@/infrastructure/dtos/document/update-document.dto'
import { DocumentoNaoEncontradoException } from '@/infrastructure/errors/document/documento-nao-encontrado.exception'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}
  async create(createDocumentDto: CreateDocumentDto) {
    const { clientId, ...document } = createDocumentDto
    return await this.documentRepository.createDocument({
      ...document,
      client: { connect: { id: clientId } },
    })
  }

  async createPdfDocument({ title, content }, clientId: string) {
    const createDocumentDto: CreateDocumentDto = {
      title,
      content,
      clientId,
      sourceType: 'PDF',
    }

    return await this.create(createDocumentDto)
  }

  async createWebDocument({ title, content }, clientId: string) {
    const createDocumentDto: CreateDocumentDto = {
      title,
      content,
      clientId,
      sourceType: 'WEB',
    }

    return await this.create(createDocumentDto)
  }

  async findAll(params: any) {
    return await this.documentRepository.documents({ where: params })
  }

  async findOne(id: string) {
    const documentFounded = await this.documentRepository.document({ id: id })
    if (!documentFounded) {
      throw new DocumentoNaoEncontradoException(id)
    }
    return await this.documentRepository.document({ id: id })
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    await this.findOne(id)
    return await this.documentRepository.updateDocument({
      where: { id: id },
      data: updateDocumentDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)
    return await this.documentRepository.deleteDocument({ id: id })
  }
}
