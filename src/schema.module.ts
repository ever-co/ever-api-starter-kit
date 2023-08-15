import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/database';
import { EmployeeModule } from './modules/employee/employee.module';
import { SchemaService } from './schema.service';
import { SeedDataService } from './modules/seeds/seed.service';
import { ApolloDriver } from '@nestjs/apollo';
import config, { ConfigurationService } from './config/config';

const autoSchemaFile = process.env.IS_NOT_SLS
	? join(process.cwd(), 'generated/schemas/schema.graphql')
	: // TODO: when we run in Serverless, this should probably be different (for now we use the same path)
	  join(process.cwd(), 'generated/schemas/schema.graphql') + '';

console.log('Schema stored in ' + autoSchemaFile);
console.log('IS_NOT_SLS: ' + process.env.IS_NOT_SLS);

// For now let's enable debug, playground, introspection etc in production
// TODO: process.env.NODE_ENV == 'production' ? true : false;
const isProd = false;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		GraphQLModule.forRoot({
			include: [EmployeeModule],
			autoSchemaFile,
			// Disable debug in production
			debug: !isProd,
			tracing: !isProd,
			driver: ApolloDriver,
			introspection: !isProd,
			playground: isProd
				? false
				: {
						endpoint: process.env.IS_NOT_SLS
							? '/graphql'
							: `/${process.env.STAGE}/graphql`,
				  },
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigModule, ConfigurationService],
			useClass: TypeOrmConfigService,
		}),
		EmployeeModule,
	],
	providers: [
		ConfigurationService,
		SchemaService,
		TypeOrmConfigService,
		SeedDataService,
	],
})
export class SchemaModule {}
