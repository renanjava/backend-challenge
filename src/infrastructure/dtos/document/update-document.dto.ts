import { PartialType } from '@nestjs/mapped-types'
import { CreateDocumentDto } from '@/infrastructure/dtos/document/create-document.dto'

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
