import { Module } from '@nestjs/common';
import { MaterialModule } from './material/material.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigMaterialAsync } from './config/typeorm-material.config';
import { DescriptionModule } from './description/description.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigMaterialAsync),
    MaterialModule,
    DescriptionModule,
  ],
})
export class AppModule2 {}
