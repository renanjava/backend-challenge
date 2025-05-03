import { UpdateDocumentInput } from '@/application/dtos/document/update-document.input'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { IDocumentRepository } from '@/domain/repositories/document.repository'

export class UpdateDocumentUseCase implements IUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository<DocumentEntity>,
  ) {}
  async execute(id: string, updateDocumentInput: UpdateDocumentInput) {
    return await this.documentRepository.updateDocument({
      where: { id: id },
      data: updateDocumentInput,
    })
  }
}
