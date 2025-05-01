import { $Enums } from '@prisma/client'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class CreateDocumentDto {
  @IsString({ message: 'Formato do titulo do documento está inválido' })
  title: string

  @IsString({ message: 'Formato do conteúdo do documento está inválido' })
  content: string

  @IsEnum($Enums.SourceType, { message: 'Tipo de documento inválido' })
  sourceType: $Enums.SourceType

  @IsUUID(undefined, { message: 'Tipo de id inválido' })
  clientId: string
}
