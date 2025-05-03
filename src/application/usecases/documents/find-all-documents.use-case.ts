import { IUseCase } from '@/application/usecases/use-case.interface'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { IDocumentRepository } from '@/domain/repositories/document.repository'

export class FindAllDocumentsUseCase implements IUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository<DocumentEntity>,
  ) {}
  async execute(params: any) {
    return await this.documentRepository.documents({ where: params })
  }
}
