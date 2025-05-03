/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientService } from '@/infrastructure/services/client.service'
import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { UpdateClientDto } from '@/infrastructure/dtos/client/update-client.dto'
import { HashPasswordPipe } from '@/infrastructure/common/pipes/hash-password.pipe'
import { DocumentService } from '@/infrastructure/services/document.service'
import { UserRequest } from '@/application/contracts/user-request.interface'
import { AuthGuard } from '@/infrastructure/common/guards/auth.guard'
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

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly documentService: DocumentService,
  ) {}

  @Post()
  async create(
    @Body() { password, ...createClientDto }: CreateClientDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    return await this.clientService.create({
      ...createClientDto,
      password: hashedPassword,
    })
  }

  @Get('/document')
  @UseGuards(AuthGuard)
  async findAllDocumentsByClient(@Req() request: UserRequest) {
    return await this.documentService.findAll({ clientId: request.user.sub })
  }

  @Get('/document/:id')
  @UseGuards(AuthGuard)
  async findOneDocumentByClient(
    @Param('id') id: string,
    @Req() request: UserRequest,
  ) {
    return await this.documentService.findAll({
      id: id,
      clientId: request.user.sub,
    })
  }

  @Get()
  findAll() {
    return this.clientService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id)
  }
}
