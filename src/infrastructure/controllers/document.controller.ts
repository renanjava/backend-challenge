import { DocumentUseCasesFactory } from '../factories/document-use-cases.factory'
import { UpdateDocumentDto } from '@/infrastructure/dtos/document/update-document.dto'
import { WebDocumentDto } from '@/infrastructure/dtos/document/web-document.dto'
import { AuthGuard } from '@/infrastructure/auth/guards/auth.guard'
import { UserRequest } from '@/infrastructure/auth/interfaces/user-request.interface'
import { ClientUseCasesFactory } from '@/infrastructure/factories/client-use-cases.factory'
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
import { FileInterceptor } from '@nestjs/platform-express'
import { IDocumentController } from '@/application/controllers/document-controller.interface'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { CreateDocumentInput } from '@/application/dtos/document/create-document.input'

@Controller('document')
export class DocumentController
  implements
    IDocumentController<WebDocumentDto, UpdateDocumentDto, DocumentEntity>
{
  constructor(
    private readonly clientUseCasesFactory: ClientUseCasesFactory,
    private readonly documentUseCasesFactory: DocumentUseCasesFactory,
  ) {}

  @Post('pdf')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createPdfDocument(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: UserRequest,
  ) {
    const pdfProcessingUseCase =
      this.documentUseCasesFactory.getPdfProcessingUseCaseInstance()
    const { title, content } = await pdfProcessingUseCase.execute(file)

    const findOneClientUseCase =
      this.clientUseCasesFactory.getFindOneClientUseCaseInstance()
    await findOneClientUseCase.execute(request.user.sub)

    const createDocumentUseCase =
      this.documentUseCasesFactory.getCreateDocumentUseCaseInstance()
    return await createDocumentUseCase.execute({
      title: title,
      content: content,
      sourceType: 'WEB',
      clientId: request.user.sub,
    } as CreateDocumentInput)
  }

  @Post('web')
  @UseGuards(AuthGuard)
  async createWebDocument(
    @Body() webDocumentDto: WebDocumentDto,
    @Req() request: UserRequest,
  ) {
    const webProcessingUseCase =
      this.documentUseCasesFactory.getWebProcessingUseCaseInstance()
    const { title, content } = await webProcessingUseCase.execute(
      webDocumentDto.url,
    )

    const findOneClientUseCase =
      this.clientUseCasesFactory.getFindOneClientUseCaseInstance()
    await findOneClientUseCase.execute(request.user.sub)

    const createDocumentUseCase =
      this.documentUseCasesFactory.getCreateDocumentUseCaseInstance()
    return await createDocumentUseCase.execute({
      title: title,
      content: content,
      sourceType: 'PDF',
      clientId: request.user.sub,
    } as CreateDocumentInput)
  }

  @Get()
  async findAll() {
    const findAllDocumentsUseCase =
      this.documentUseCasesFactory.getFindAllDocumentsUseCaseInstance()
    return await findAllDocumentsUseCase.execute({})
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findOneDocumentUseCase =
      this.documentUseCasesFactory.getFindOneDocumentUseCaseInstance()
    return await findOneDocumentUseCase.execute(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    await this.findOne(id)
    const updateDocumentUseCase =
      this.documentUseCasesFactory.getUpdateDocumentUseCaseInstance()
    return await updateDocumentUseCase.execute(id, updateDocumentDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.findOne(id)
    const removeDocumentUseCase =
      this.documentUseCasesFactory.getRemoveDocumentUseCaseInstance()
    return await removeDocumentUseCase.execute(id)
  }
}
