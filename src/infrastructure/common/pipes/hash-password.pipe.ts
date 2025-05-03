import { IPasswordHashing } from '@/application/common/utils/password-hashing.interface'
import { Inject, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(
    @Inject('BcryptImpl')
    private readonly passwordHashing: IPasswordHashing,
  ) {}
  async transform(password: string) {
    return await this.passwordHashing.hash(password, 10)
  }
}
