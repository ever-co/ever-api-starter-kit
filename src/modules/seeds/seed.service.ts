import {
	Connection,
	getConnection,
	createConnection,
	DataSourceOptions,
	getRepository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Entities, TypeOrmConfigService } from '../../config/database';
import { createEmployees } from '../employee/employee.seed';
import { ConfigurationService } from '../../config/config';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class SeedDataService {
	constructor(
		private readonly typeOrmConfigService: TypeOrmConfigService,
		private readonly configService: ConfigurationService,
		private readonly employeeService: EmployeeService
	) {}

	public async executeSeed(isDefault: boolean): Promise<void> {
		try {
			await this.createConnection();

			const count = await this.employeeService.count();

			if (count === 0) {
				await this.resetDatabase();
				await this.seedData(isDefault);

				console.log('Seed Completed');
			} else {
				console.log(`DB Already Seeded`);
			}
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async executeUpdate(isDefault: boolean): Promise<void> {
		try {
			await this.createConnection();

			const count = await this.employeeService.count();

			if (count === 0) {
				console.log(`Start seed...`);

				await this.resetDatabase();
				await this.seedData(isDefault);

				console.log('Seed Completed');
			} else {
				console.log(`Update DB...`);
				await this.seedData(isDefault);
				console.log('Update Completed');
			}
		} catch (error) {
			await this.handleError(error);
		}
	}

	private connection: Connection;

	private tryExecute<T>(
		name: string,
		p: Promise<T>
	): Promise<T> | Promise<void> {
		console.log(`Execute Seed for ${name}`);

		return (p as any).then(
			(x: T) => x,
			(error: Error) => {
				console.error(error);
			}
		);
	}

	private async createConnection() {
		try {
			this.connection = getConnection();
		} catch (error) {
			console.log('DB not found. Creating new DB');
		}

		if (!this.connection || !this.connection.isConnected) {
			try {
				console.log(`Checking connection to DB ...`);

				const dbConnectOptions =
					await this.typeOrmConfigService.createTypeOrmOptions();

				const overrideDbConfig = {
					logging: true,
					logger: 'file',
				};

				this.connection = await createConnection({
					...dbConnectOptions,
					...overrideDbConfig,
					entities: Entities,
				} as DataSourceOptions);
			} catch (error) {
				await this.handleError(error, 'Cannot connect to DB!');
			}
		}
	}

	private async seedData(isDefault: boolean): Promise<void> {
		try {
			await this.tryExecute(
				'Employees',
				createEmployees(this.connection)
			);
			console.log(`Seed Completed`);
		} catch (error) {
			await this.handleError(error);
		}
	}

	/**
	 * Retrieve entities metadata
	 */
	private async getEntities() {
		const entities: any = [];
		try {
			this.connection.entityMetadatas.forEach((entity) =>
				entities.push({
					name: entity.name,
					tableName: entity.tableName,
				})
			);
			return entities;
		} catch (error) {
			await this.handleError(error, 'Cannot read metadata from entities');
		}
	}

	private async cleanAll(entities: any) {
		try {
			for (const entity of entities) {
				const repository = getRepository(entity.name);
				const truncateSql =
					this.configService.dbType() === 'sqlite'
						? `DELETE FROM  "${entity.tableName}";`
						: `TRUNCATE  "${entity.tableName}" RESTART IDENTITY CASCADE;`;
				await repository.query(truncateSql);
			}
		} catch (error) {
			await this.handleError(error, 'Clean database failed');
		}
	}

	private async resetDatabase() {
		const entities = await this.getEntities();
		await this.cleanAll(entities);
		console.log(`DB Reset`);
	}

	private async handleError(error: Error, message?: string) {
		console.error(error, message);
		throw error;
	}
}
