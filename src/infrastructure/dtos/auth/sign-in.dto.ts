import { SignInInput } from '@/application/dtos/auth/sign-in.input'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInDto implements SignInInput {
  @IsEmail({}, { message: 'O email está em um formato inválido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}
