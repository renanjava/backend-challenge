import { Injectable, PipeTransform } from '@nestjs/common'
import { DocumentAdapter } from '@/infrastructure/adapters/document.adapter'
import { UpdateDocumentDto } from '@/infrastructure/dtos/document/update-document.dto'

@Injectable()
export class UpdateDocumentAdapterPipe implements PipeTransform {
  transform(updateDocumentDto: UpdateDocumentDto) {
    return DocumentAdapter.updateDtoToInput(updateDocumentDto)
  }
}
