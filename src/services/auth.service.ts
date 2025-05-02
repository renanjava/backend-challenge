import { Injectable /*, UnauthorizedException*/ } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ClientRepository } from '@/repositories/client.repository'

@Injectable()
export class AuthService {
  constructor(
    private clientRepository: ClientRepository,
    private jwtService: JwtService,
  ) {}
  /*
  async signIn(
    name: string,
    password: string,
  ): Promise<{ access_token: string }> {
    
    const client = await this.clientRepository.client({
      name: name,
      password: password,
    })

    if (client?.email !== email) {
      throw new UnauthorizedException()
    }
    const payload = { sub: client.id, username: client.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
    */
}
