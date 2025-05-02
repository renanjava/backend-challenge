import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@/modules/database.module'
import { ClientModule } from '@/modules/client.module'
import { DocumentModule } from '@/modules/document.module'
import { AuthModule } from '@/modules/auth.module'

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
