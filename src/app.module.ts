import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@/config/database/database.module'
import { ClientModule } from './modules/client.module'
import { DocumentModule } from './modules/document.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ClientModule,
    DocumentModule,
  ],
})
export class AppModule {}
