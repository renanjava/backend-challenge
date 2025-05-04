import { CreateDocumentInput } from '@/application/dtos/document/create-document.input'

describe('CreateDocumentInput', () => {
  it('should create a valid CreateDocumentInput instance', () => {
    const input = new CreateDocumentInput(
      'Test Title',
      'Test Content',
      'WEB',
      'client-id-123',
    )

    expect(input.title).toBe('Test Title')
    expect(input.content).toBe('Test Content')
    expect(input.sourceType).toBe('WEB')
    expect(input.clientId).toBe('client-id-123')
  })
})
