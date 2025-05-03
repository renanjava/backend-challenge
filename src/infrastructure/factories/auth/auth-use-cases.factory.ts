import { IPasswordHashing } from '@/application/common/utils/password-hashing.interface'
import { ITokenGenerate } from '@/application/services/token-generate.interface'
import { SignInUseCase } from '@/application/usecases/auth/sign-in.use-case'
import { ClientEntity } from '@/domain/entities/client.entity'
import { IClientRepository } from '@/domain/repositories/client.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AuthUseCasesFactory {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository<ClientEntity>,
    @Inject('JwtService')
    private readonly jwtService: ITokenGenerate,
    @Inject('BcryptImpl')
    private readonly passwordHashing: IPasswordHashing,
  ) {}

  getSignInUseCaseInstance(): SignInUseCase {
    return new SignInUseCase(
      this.clientRepository,
      this.jwtService,
      this.passwordHashing,
    )
  }
}
