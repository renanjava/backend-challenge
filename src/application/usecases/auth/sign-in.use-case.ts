import { UserPayload } from '@/application/controllers/user-payload.props'
import { IUseCase } from '@/application/usecases/use-case.interface'
import { IClientRepository } from '@/domain/repositories/client.repository'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IJwtService } from '@/application/services/jwt-service.interface'
import { AcessToken } from '@/application/services/acess-token.interface'
import { IPasswordHashing } from '@/application/common/utils/password-hashing.interface'
import { ClienteNaoEncontradoError } from '@/application/errors/client/cliente-nao-encontrado.exception'
import { SenhaInvalidaError } from '@/application/errors/auth/senha-invalida.exception'
import { SignInInput } from '@/application/dtos/auth/sign-in.input'

export class SignInUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientRepository<ClientEntity>,
    private readonly jwtService: IJwtService,
    private readonly passwordHashing: IPasswordHashing,
  ) {}
  async execute(signInInput: SignInInput): Promise<AcessToken> {
    const client = await this.clientRepository.client({
      email: signInInput.email,
    })

    if (!client || !client.id) {
      throw new ClienteNaoEncontradoError(signInInput.email)
    }

    const passwordIsValid = await this.passwordHashing.compare(
      signInInput.password,
      client.password,
    )

    if (!passwordIsValid) {
      throw new SenhaInvalidaError()
    }
    const payload: UserPayload = { sub: client.id, username: client.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
