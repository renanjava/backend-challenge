import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { DocumentModule } from '@/infrastructure/modules/document.module'
import { AuthModule } from '@/infrastructure/modules/auth.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ClientModule,
    DocumentModule,
    AuthModule,
  ],
})
export class AppModule {}
