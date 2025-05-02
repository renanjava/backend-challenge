/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ClientService } from '../services/client.service'
import { CreateClientDto } from '@/dtos/client/create-client.dto'
import { UpdateClientDto } from '@/dtos/client/update-client.dto'
import { HashPasswordPipe } from '@/common/pipes/hash-password.pipe'
import { DocumentService } from '@/services/document.service'
import { UserRequest } from '@/contracts/user-request.interface'
import { AuthGuard } from '@/common/guards/auth.guard'

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

  @Get('/documents')
  @UseGuards(AuthGuard)
  async findAllDocumentsByClient(@Req() request: UserRequest) {
    return await this.documentService.findAll({ clientId: request.user.sub })
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
