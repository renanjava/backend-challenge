import * as bcrypt from 'bcryptjs'

export abstract class Password {
  public static async hash(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  public static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
