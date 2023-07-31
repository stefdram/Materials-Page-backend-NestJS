import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materials } from './entity/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materials])],
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class MaterialModule {}
