/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientUseCasesFactory } from '@/infrastructure/factories/client-use-cases.factory'
import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { UpdateClientDto } from '@/infrastructure/dtos/client/update-client.dto'
import { HashPasswordPipe } from '@/infrastructure/common/pipes/hash-password.pipe'
import { UserRequest } from '@/infrastructure/auth/interfaces/user-request.interface'
import { AuthGuard } from '@/infrastructure/auth/guards/auth.guard'
import { DocumentUseCasesFactory } from '@/infrastructure/factories/document-use-cases.factory'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common'
import { IClientController } from '@/application/controllers/client-controller.interface'
import { ClientEntity } from '@/domain/entities/client.entity'
import { CreateClientAdapterPipe } from '../common/pipes/create-client-adapter.pipe'
import { UpdateClientAdapterPipe } from '../common/pipes/update-client-adapter.pipe'

@Controller('client')
export class ClientController
  implements IClientController<ClientEntity, CreateClientDto, UpdateClientDto>
{
  constructor(
    private readonly clientUseCasesFactory: ClientUseCasesFactory,
    private readonly documentUseCasesFactory: DocumentUseCasesFactory,
  ) {}

  @Post()
  async create(
    @Body(CreateClientAdapterPipe)
    { password, ...createClientDto }: CreateClientDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    const createClientUseCase =
      this.clientUseCasesFactory.getCreateClientUseCaseInstance()
    return await createClientUseCase.execute({
      ...createClientDto,
      password: hashedPassword,
    })
  }

  @Get('/document')
  @UseGuards(AuthGuard)
  async findAllDocumentsByClient(@Req() request: UserRequest) {
    const findAllDocumentsUseCase =
      this.documentUseCasesFactory.getFindAllDocumentsUseCaseInstance()
    return await findAllDocumentsUseCase.execute({ clientId: request.user.sub })
  }

  @Get('/document/:id')
  @UseGuards(AuthGuard)
  async findOneDocumentByClient(
    @Param('id') id: string,
    @Req() request: UserRequest,
  ) {
    const findAllDocumentsUseCase =
      this.documentUseCasesFactory.getFindAllDocumentsUseCaseInstance()
    return await findAllDocumentsUseCase.execute({
      id: id,
      clientId: request.user.sub,
    })
  }

  @Get()
  async findAll() {
    const findAllClientsUseCase =
      this.clientUseCasesFactory.getFindAllClientsUseCaseInstance()
    return await findAllClientsUseCase.execute()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findOneClientUseCase =
      this.clientUseCasesFactory.getFindOneClientUseCaseInstance()
    return await findOneClientUseCase.execute(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(UpdateClientAdapterPipe) updateClientDto: UpdateClientDto,
  ) {
    await this.findOne(id)
    const updateClientUseCase =
      this.clientUseCasesFactory.getUpdateClientUseCaseInstance()
    return await updateClientUseCase.execute(id, updateClientDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.findOne(id)
    const removeClientUseCase =
      this.clientUseCasesFactory.getRemoveClientUseCaseInstance()
    return await removeClientUseCase.execute(id)
  }
}
