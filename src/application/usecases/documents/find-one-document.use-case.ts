import { DocumentoNaoEncontradoError } from '@/application/errors/documents/documento-nao-encontrado.error'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { IDocumentRepository } from '@/domain/repositories/document.repository'

export class FindOneDocumentUseCase implements IUseCase {
  constructor(
    private readonly documentRepository: IDocumentRepository<DocumentEntity>,
  ) {}
  async execute(documentId: string) {
    const documentFounded = await this.documentRepository.document({
      id: documentId,
    })
    if (!documentFounded) {
      throw new DocumentoNaoEncontradoError(documentId)
    }
    return documentFounded
  }
}
