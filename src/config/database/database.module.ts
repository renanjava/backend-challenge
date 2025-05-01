import { Module } from '@nestjs/common'
import { DatabaseConnection } from './database.connection'

@Module({
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}
