import { IPasswordHashing } from '@/application/common/utils/password-hashing.interface'
import * as bcrypt from 'bcryptjs'

export class BcryptPassword implements IPasswordHashing {
  public async hash(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
