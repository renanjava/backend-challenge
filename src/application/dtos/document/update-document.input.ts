import { DocumentEntity } from '@/domain/entities/document.entity'

export class UpdateDocumentInput implements Partial<DocumentEntity> {
  constructor(
    public title?: string,
    public content?: string,
    public sourceType?: string,
    public clientId?: string,
  ) {}
}
