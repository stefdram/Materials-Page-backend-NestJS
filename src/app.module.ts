import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigLoginAsync } from './config/typeorm-login.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigLoginAsync), LoginModule],
})
export class AppModule {}
