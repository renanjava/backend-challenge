import { IUseCase } from '@/application/usecases/use-case.interface'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { IDocumentRepository } from '@/domain/repositories/document.repository'

export class RemoveDocumentUseCase implements IUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository<DocumentEntity>,
  ) {}
  async execute(documentId: string) {
    return await this.documentRepository.deleteDocument({ id: documentId })
  }
}
