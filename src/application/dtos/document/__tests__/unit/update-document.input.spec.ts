import { UpdateDocumentInput } from '@/application/dtos/document/update-document.input'

describe('UpdateDocumentInput', () => {
  it('should create a valid UpdateDocumentInput instance', () => {
    const input = new UpdateDocumentInput('Updated Title', 'Updated Content')

    expect(input.title).toBe('Updated Title')
    expect(input.content).toBe('Updated Content')
  })
})
