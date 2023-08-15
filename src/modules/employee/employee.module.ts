import { ConfigModule } from '@nestjs/config';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDTO } from './dto/employee.dto';
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './resolvers/employee.resolver';
import config from '../../config/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
		}),
		TypeOrmModule.forFeature([Employee]),
		NestjsQueryGraphQLModule.forFeature({
			imports: [NestjsQueryTypeOrmModule.forFeature([Employee])],
			resolvers: [
				{
					DTOClass: EmployeeDTO,
					EntityClass: Employee,
					enableSubscriptions: true,
					delete: {
						disabled: false,
					},
				},
			],
		}),
	],
	controllers: [EmployeeController],
	providers: [EmployeeService, EmployeeResolver],
	exports: [EmployeeService],
})
export class EmployeeModule {}
