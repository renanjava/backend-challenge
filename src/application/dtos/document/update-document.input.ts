import { DocumentEntity } from '@/domain/entities/document.entity'

export class UpdateDocumentInput implements Partial<DocumentEntity> {
  title?: string
  content?: string
  sourceType?: string
  clientId?: string
}
