import { CreateDocumentDto } from '@/infrastructure/dtos/document/create-document.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
