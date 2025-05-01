import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const applicationPort = configService.get<number>('PORT')
  if (!applicationPort) {
    throw new NotFoundException('Variável de ambiente PORT não definida')
  }

  await app.listen(applicationPort)
  Logger.log(`Server is running on port ${applicationPort}`, 'ApplicationPort')
}
void bootstrap()
