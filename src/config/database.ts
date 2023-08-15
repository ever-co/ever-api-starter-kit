import * as path from 'path';
import { TlsOptions } from 'tls';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Tenant, Organization } from '../entity';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { Employee } from '../modules/employee/employee.entity';

export const Entities = [Tenant, Organization, Employee];

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		const connectionManager: ConnectionManager = getConnectionManager();
		let options: any;

		const dbType = this.configService.get<string>('config.dbType');
		console.log('DB Type configured: ' + dbType);

		if (connectionManager.has('default')) {
			options = connectionManager.get('default').options;
			await connectionManager.get('default').close();
		} else {
			if (dbType == 'sqljs') {
				options = {
					type: dbType,
					autoSave: true,
					location: 'ever.db',
					logging: 'all',
					logger: 'file', // Removes console logging, instead logs all queries in a file ormlogs.log
					entities: Entities,
					synchronize:
						process.env.DB_SYNCHRONIZE === 'true' ? true : false, // We are using migrations, synchronize should be set to false.
				};
			} else if (dbType == 'sqlite') {
				const dbPath =
					process.env.DB_PATH ||
					path.join(process.cwd(), 'ever.sqlite3');

				console.log('Sqlite DB Path: ' + dbPath);

				options = {
					type: dbType,
					database: dbPath,
					logging: 'all',
					logger: 'file', // Removes console logging, instead logs all queries in a file ormlogs.log
					entities: Entities,
					synchronize:
						process.env.DB_SYNCHRONIZE === 'true' ? true : false, // We are using migrations, synchronize should be set to false.
				};
			} else if (dbType == 'postgres') {
				const ssl =
					process.env.DB_SSL_MODE === 'true' ? true : undefined;

				let sslParams: TlsOptions;

				if (ssl) {
					const base64data = process.env.DB_CA_CERT;
					const buff = Buffer.from(base64data, 'base64');
					const sslCert = buff.toString('ascii');

					sslParams = {
						rejectUnauthorized: true,
						ca: sslCert,
					};
				}

				options = {
					type: dbType,
					host: process.env.DB_HOST || 'localhost',
					username: process.env.DB_USER || 'postgres',
					password: process.env.DB_PASS || 'root',
					ssl: ssl ? sslParams : undefined,
					database: process.env.DB_NAME || 'ever',
					port: process.env.DB_PORT
						? parseInt(process.env.DB_PORT, 10)
						: 5432,
					entities: Entities,
					// autoLoadEntities: true, // Note: possible to use instead: entities: Entities,
					logging: 'all',
					logger: 'file', // Removes console logging, instead logs all queries in a file ormlogs.log
					synchronize: true, // TODO: process.env.DB_SYNCHRONIZE === 'true' ? true : false, // We are using migrations, synchronize should be set to false.
					uuidExtension: 'pgcrypto',
				} as TypeOrmModuleOptions;
			} else {
				throw new Error(
					`Critical: DB of type ${dbType} not supported yet`
				);
			}
		}
		return options;
	}
}
