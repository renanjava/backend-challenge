import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { DocumentService } from '../services/document.service'
import { CreateDocumentDto } from '@/dtos/document/create-document.dto'
import { UpdateDocumentDto } from '@/dtos/document/update-document.dto'

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentService.create(createDocumentDto)
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
