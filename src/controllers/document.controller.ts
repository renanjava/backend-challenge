import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { DocumentService } from '../services/document.service'
import { CreateDocumentDto } from '@/dtos/document/create-document.dto'
import { UpdateDocumentDto } from '@/dtos/document/update-document.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { PdfProcessingService } from '@/services/pdf-processing.service'
import { ClientService } from '@/services/client.service'

@Controller('document')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly pdfProcessingService: PdfProcessingService,
    private readonly clientService: ClientService,
  ) {}

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentService.create(createDocumentDto)
  }

  @Post('pdf/:id')
  @UseInterceptors(FileInterceptor('file'))
  async createPdfDocument(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') clientId: string,
  ) {
    const { title, content } =
      await this.pdfProcessingService.extractTitleAndContent(file)

    await this.clientService.findOne(clientId)

    return await this.documentService.createPdfDocument(
      { title, content },
      clientId,
    )
  }

  @Get()
  async findAll() {
    return await this.documentService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return await this.documentService.update(id, updateDocumentDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.documentService.remove(id)
  }
}
