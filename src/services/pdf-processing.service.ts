import { BadRequestException, Injectable } from '@nestjs/common'
import pdfParse from 'pdf-parse'
import ProcessingDocument from '../contracts/processing-document.interface'
import { ExtractedDocumentProps } from '@/contracts/extracted-document.props'

@Injectable()
export class PdfProcessingService implements ProcessingDocument {
  async extractTitleAndContent(
    file: Express.Multer.File,
  ): Promise<ExtractedDocumentProps> {
    if (!file.mimetype || file.mimetype !== 'application/pdf') {
      throw new BadRequestException(
        `O arquivo enviado não é um PDF válido. Tipo recebido: ${file.mimetype}`,
      )
    }

    const data = await pdfParse(file.buffer)
    const title = data.info.Title || 'Título não encontrado'
    const content = data.text

    if (!content || content.trim() === '') {
      throw new BadRequestException('O PDF não contém conteúdo válido.')
    }

    if (!title || title.trim() === 'Título não encontrado') {
      throw new BadRequestException('O PDF não contém um título válido.')
    }

    return { title, content } as ExtractedDocumentProps
  }
}
