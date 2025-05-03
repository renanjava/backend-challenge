import { PartialType } from '@nestjs/mapped-types'
import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'

export class UpdateClientDto extends PartialType(CreateClientDto) {}
