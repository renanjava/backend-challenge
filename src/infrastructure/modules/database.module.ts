import { DatabaseConnection } from '@/infrastructure/config/database/database.connection'
import { Module } from '@nestjs/common'

@Module({
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}
