import { IPdfProcessing } from '@/application/common/utils/pdf-processing.interface'
import { Injectable } from '@nestjs/common'
import pdfParse from 'pdf-parse'

@Injectable()
export class PdfParseImpl implements IPdfProcessing {
  async parse(file: Buffer<ArrayBufferLike>) {
    return await pdfParse(file)
  }
}
