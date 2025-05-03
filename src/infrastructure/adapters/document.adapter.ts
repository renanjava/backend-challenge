import { UpdateDocumentInput } from '@/application/dtos/document/update-document.input'
import { UpdateDocumentDto } from '../dtos/document/update-document.dto'

export abstract class DocumentAdapter {
  static updateDtoToInput(dto: UpdateDocumentDto): UpdateDocumentInput {
    return new UpdateDocumentInput(
      dto.title,
      dto.content,
      dto.sourceType,
      dto.clientId,
    )
  }
}
