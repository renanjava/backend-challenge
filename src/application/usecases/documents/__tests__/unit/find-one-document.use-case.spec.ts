/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FindOneDocumentUseCase } from '@/application/usecases/documents/find-one-document.use-case'
import { DocumentoNaoEncontradoError } from '@/application/errors/documents/documento-nao-encontrado.error'

describe('FindOneDocumentUseCase', () => {
  let useCase: FindOneDocumentUseCase
  let mockDocumentRepository: any

  beforeEach(() => {
    mockDocumentRepository = {
      document: jest.fn(),
    }
    useCase = new FindOneDocumentUseCase(mockDocumentRepository)
  })

  it('should return a document if found', async () => {
    const document = { id: '1', title: 'Test Document' }
    mockDocumentRepository.document.mockResolvedValue(document)

    const result = await useCase.execute('1')

    expect(mockDocumentRepository.document).toHaveBeenCalledWith({ id: '1' })
    expect(result).toEqual(document)
  })

  it('should throw DocumentoNaoEncontradoError if document is not found', async () => {
    mockDocumentRepository.document.mockResolvedValue(null)

    await expect(useCase.execute('1')).rejects.toThrow(
      DocumentoNaoEncontradoError,
    )
    expect(mockDocumentRepository.document).toHaveBeenCalledWith({ id: '1' })
  })
})
