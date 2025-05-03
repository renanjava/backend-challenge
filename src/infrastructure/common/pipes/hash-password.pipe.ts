import { Password } from '@/infrastructure/common/utils/Password'
import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(password: string) {
    return await Password.hash(password, 10)
  }
}
