import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import { AppDataSource } from '@database/index';
import { TypeOrmConfigService } from '@database/typeorm-config.service';
import { DishModule } from '@modules/dish/dish.module';
import { IngredientModule } from '@modules/ingredient/ingredient.module';
import { RecipeModule } from '@modules/recipe/recipe.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppConfig } from './app.config';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
    DishModule,
    IngredientModule,
    RecipeModule,
  ],
  providers: [AppService],
})
export class AppModule {}
