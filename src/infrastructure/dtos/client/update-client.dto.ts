import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateClientDto extends PartialType(CreateClientDto) {}
