/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UpdateDocumentUseCase } from '@/application/usecases/documents/update-document.use-case'

describe('UpdateDocumentUseCase', () => {
  let useCase: UpdateDocumentUseCase
  let mockDocumentRepository: any

  beforeEach(() => {
    mockDocumentRepository = {
      updateDocument: jest.fn(),
    }
    useCase = new UpdateDocumentUseCase(mockDocumentRepository)
  })

  it('should update a document and return the updated document', async () => {
    const updatedDocument = { id: '1', title: 'Updated Title' }
    mockDocumentRepository.updateDocument.mockResolvedValue(updatedDocument)

    const result = await useCase.execute('1', { title: 'Updated Title' })

    expect(mockDocumentRepository.updateDocument).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { title: 'Updated Title' },
    })
    expect(result).toEqual(updatedDocument)
  })
})
