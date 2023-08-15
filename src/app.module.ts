import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfigService } from './config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AppSagas } from './sagas/app.saga';
import config, { ConfigurationService } from './config/config';
import { SeedDataService } from './modules/seeds/seed.service';

const autoSchemaFile = process.env.IS_NOT_SLS
	? join(process.cwd(), 'generated/schemas/schema.graphql')
	: // TODO: when we run in Serverless, this should probably be different (for now we use the same path)
	  join(process.cwd(), 'generated/schemas/schema.graphql') + '';

console.log('Schema stored in: ' + autoSchemaFile);
console.log('IS_NOT_SLS: ' + process.env.IS_NOT_SLS);

const isProd = process.env.NODE_ENV == 'production' ? true : false;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			include: [EmployeeModule],
			autoSchemaFile,
			introspection: !isProd,
			driver: ApolloDriver,
			playground: isProd
				? false
				: {
						endpoint: process.env.IS_NOT_SLS
							? '/graphql'
							: `/${process.env.STAGE}/graphql`,
				  },
		}),
		CqrsModule,
		TypeOrmModule.forRootAsync({
			inject: [ConfigModule, ConfigurationService],
			useClass: TypeOrmConfigService,
		}),
		AuthModule,
		EmployeeModule,
	],
	controllers: [AppController],
	providers: [
		ConfigurationService,
		AppService,
		TypeOrmConfigService,
		SeedDataService,
		AppSagas,
	],
})
export class AppModule {}
