import { DocumentRepository } from '@/repositories/document.repository'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ClientService } from './client.service'
import pdfParse from 'pdf-parse'

@Injectable()
export class PdfProcessingService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly clientService: ClientService,
  ) {}
  async extractTitleAndContent(file: Express.Multer.File) {
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

    return { title, content }
  }
}
