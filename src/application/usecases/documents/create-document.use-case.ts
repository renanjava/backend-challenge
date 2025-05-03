import { CreateDocumentInput } from '@/application/dtos/document/create-document.input'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { IDocumentRepository } from '@/domain/repositories/document.repository'

export class CreateDocumentUseCase implements IUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository<DocumentEntity>,
  ) {}
  async execute(createDocumentInput: CreateDocumentInput) {
    const { clientId, ...document } = createDocumentInput
    return await this.documentRepository.createDocument({
      ...document,
      client: { connect: { id: clientId } },
    })
  }
}
