/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FindAllDocumentsUseCase } from '@/application/usecases/documents/find-all-documents.use-case'

describe('FindAllDocumentsUseCase', () => {
  let useCase: FindAllDocumentsUseCase
  let mockDocumentRepository: any

  beforeEach(() => {
    mockDocumentRepository = {
      documents: jest.fn(),
    }
    useCase = new FindAllDocumentsUseCase(mockDocumentRepository)
  })

  it('should return all documents', async () => {
    const documents = [
      { id: '1', title: 'Doc 1' },
      { id: '2', title: 'Doc 2' },
    ]
    mockDocumentRepository.documents.mockResolvedValue(documents)

    const result = await useCase.execute({})

    expect(mockDocumentRepository.documents).toHaveBeenCalledWith({ where: {} })
    expect(result).toEqual(documents)
  })
})
