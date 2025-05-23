import { AppModule } from '@/infrastructure/modules/app.module'
import { Logger, NotFoundException, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { HttpExceptionFilter } from '@/infrastructure/common/filters/global-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const applicationPort = configService.get<number>('PORT')
  if (!applicationPort) {
    throw new NotFoundException('Variável de ambiente PORT não definida')
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(applicationPort)
  Logger.log(`Server is running on port ${applicationPort}`, 'ApplicationPort')
}
void bootstrap()
