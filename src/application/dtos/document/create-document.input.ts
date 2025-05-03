import { DocumentEntity } from '@/domain/entities/document.entity'

export class CreateDocumentInput implements DocumentEntity {
  constructor(
    public title: string,
    public content: string,
    public sourceType: string,
    public clientId: string,
  ) {}
}
