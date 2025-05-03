import { IsUrl } from 'class-validator'

export class WebDocumentDto {
  @IsUrl({}, { message: 'A url do site fornecida é inválida' })
  url: string
}
