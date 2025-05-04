/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RemoveDocumentUseCase } from '@/application/usecases/documents/remove-document.use-case'

describe('RemoveDocumentUseCase', () => {
  let useCase: RemoveDocumentUseCase
  let mockDocumentRepository: any

  beforeEach(() => {
    mockDocumentRepository = {
      deleteDocument: jest.fn(),
    }
    useCase = new RemoveDocumentUseCase(mockDocumentRepository)
  })

  it('should remove a document', async () => {
    const documentId = '1'
    const deletedDocument = { id: '1' }
    mockDocumentRepository.deleteDocument.mockResolvedValue(deletedDocument)

    const result = await useCase.execute(documentId)

    expect(mockDocumentRepository.deleteDocument).toHaveBeenCalledWith({
      id: documentId,
    })
    expect(result).toEqual(deletedDocument)
  })
})
