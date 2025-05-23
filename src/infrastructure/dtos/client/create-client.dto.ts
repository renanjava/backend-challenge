import { ClientEntity } from '@/domain/entities/client.entity'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateClientDto implements ClientEntity {
  @IsEmail({}, { message: 'O email está em um formato inválido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string
}
