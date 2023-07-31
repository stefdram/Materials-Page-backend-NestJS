import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfigLogin {
  static getOrmConfigLogin(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT'), 10),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/../login/entity/*.entity.{ts,js}'],
      synchronize: false,
    };
  }
}

export const typeOrmConfigLoginAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfigLogin.getOrmConfigLogin(configService),
  inject: [ConfigService],
};

// export const typeOrmConfigMaterials: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_MATERIAL_HOST,
//   port: parseInt(process.env.DB_MATERIAL_PORT, 10),
//   username: process.env.DB_MATERIAL_USER,
//   password: process.env.DB_MATERIAL_PASSWORD,
//   database: process.env.DB_MATERIAL_NAME,
//   entities: [__dirname + '/../material/entity/*.entity.{ts,js}'],
//   synchronize: false,
// };