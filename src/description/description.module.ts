import { Module } from '@nestjs/common';
import { DescriptionController } from './description.controller';
import { DescriptionService } from './description.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descriptions } from './entity/description.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Descriptions])],
  controllers: [DescriptionController],
  providers: [DescriptionService]
})
export class DescriptionModule {}
