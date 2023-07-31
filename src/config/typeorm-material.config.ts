import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfigMaterial {
  static getOrmConfigMaterial(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_MATERIAL_HOST'),
      port: parseInt(configService.get('DB_MATERIAL_PORT'), 10),
      username: configService.get('DB_MATERIAL_USER'),
      password: configService.get('DB_MATERIAL_PASSWORD'),
      database: configService.get('DB_MATERIAL_NAME'),
      entities: [
        __dirname + '/../material/entity/*.entity.{ts,js}',
        __dirname + '/../description/entity/*.entity.{ts,js}',
      ],
      synchronize: false,
    };
  }
}

export const typeOrmConfigMaterialAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfigMaterial.getOrmConfigMaterial(configService),
  inject: [ConfigService],
};
