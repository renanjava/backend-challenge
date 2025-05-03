import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'
import { Password } from '@/infrastructure/common/utils/Password'
import { ClienteNaoEncontradoException } from '@/infrastructure/errors/client/cliente-nao-encontrado.exception'
import { SenhaInvalidaException } from '@/infrastructure/errors/auth/senha-invalida.exception'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private clientRepository: ClientRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const client = await this.clientRepository.client({
      email: signInDto.email,
    })

    if (!client) {
      throw new ClienteNaoEncontradoException(signInDto.email)
    }

    const passwordIsValid = await Password.compare(
      signInDto.password,
      client.password,
    )

    if (!passwordIsValid) {
      throw new SenhaInvalidaException()
    }
    const payload = { sub: client.id, username: client.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
