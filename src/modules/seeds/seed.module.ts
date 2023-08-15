import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from '../../config/database';
import { EmployeeModule } from '../employee/employee.module';
import config, { ConfigurationService } from '../../config/config';
import { SeedDataService } from './seed.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		CqrsModule,
		TypeOrmModule.forRootAsync({
			inject: [ConfigModule, ConfigurationService],
			useClass: TypeOrmConfigService,
		}),
		EmployeeModule,
	],
	controllers: [],
	providers: [ConfigurationService, TypeOrmConfigService, SeedDataService],
})
export class SeedAppModule {}
