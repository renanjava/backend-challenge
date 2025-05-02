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
  UseGuards,
  Req,
} from '@nestjs/common'
import { DocumentService } from '../services/document.service'
import { UpdateDocumentDto } from '@/dtos/document/update-document.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { PdfProcessingService } from '@/services/pdf-processing.service'
import { ClientService } from '@/services/client.service'
import { WebDocumentDto } from '@/dtos/document/web-document.dto'
import { WebProcessingService } from '@/services/web-processing.service'
import { AuthGuard } from '@/common/guards/auth.guard'
import { UserRequest } from '@/contracts/user-request.interface'

@Controller('document')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly pdfProcessingService: PdfProcessingService,
    private readonly webProcessingService: WebProcessingService,
    private readonly clientService: ClientService,
  ) {}

  @Post('pdf')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createPdfDocument(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: UserRequest,
  ) {
    const { title, content } =
      await this.pdfProcessingService.extractTitleAndContent(file)

    await this.clientService.findOne(request.user.sub)
    return await this.documentService.createPdfDocument(
      { title, content },
      request.user.sub,
    )
  }

  @Post('web')
  @UseGuards(AuthGuard)
  async createWebDocument(
    @Body() webDocumentDto: WebDocumentDto,
    @Req() request: UserRequest,
  ) {
    const { title, content } =
      await this.webProcessingService.extractTitleAndContent(webDocumentDto.url)

    await this.clientService.findOne(request.user.sub)
    return await this.documentService.createWebDocument(
      { title, content },
      request.user.sub,
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
