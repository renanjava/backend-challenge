/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CreateDocumentUseCase } from '@/application/usecases/documents/create-document.use-case'

describe('CreateDocumentUseCase', () => {
  let useCase: CreateDocumentUseCase
  let mockDocumentRepository: any

  beforeEach(() => {
    mockDocumentRepository = {
      createDocument: jest.fn(),
    }
    useCase = new CreateDocumentUseCase(mockDocumentRepository)
  })

  it('should create a document', async () => {
    const input = { clientId: '1', title: 'Doc', content: 'Content' }
    const createdDocument = { id: '1', title: 'Doc', content: 'Content' }
    mockDocumentRepository.createDocument.mockResolvedValue(createdDocument)

    const result = await useCase.execute(input as any)

    expect(mockDocumentRepository.createDocument).toHaveBeenCalledWith({
      title: 'Doc',
      content: 'Content',
      client: { connect: { id: '1' } },
    })
    expect(result).toEqual(createdDocument)
  })
})
