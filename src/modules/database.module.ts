import { Module } from '@nestjs/common'
import { DatabaseConnection } from '../config/database/database.connection'

@Module({
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}
