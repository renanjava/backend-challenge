import { validate } from 'class-validator'
import { CreateDocumentDto } from '../../document/create-document.dto'
import { CreateClientDto } from '../../client/create-client.dto'

describe('DTO Validation', () => {
  it('should validate CreateDocumentDto', async () => {
    const dto = new CreateDocumentDto()
    dto.title = 'Test'
    dto.content = 'Content'
    dto.sourceType = 'PDF' as any
    dto.clientId = 'invalid-uuid'

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('should validate CreateClientDto', async () => {
    const dto = new CreateClientDto()
    dto.name = ''
    dto.email = 'invalid-email'

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
  })
})
