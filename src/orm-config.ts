import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Entities } from './core/entities';
import { TlsOptions } from 'tls';
import path from 'path';

dotenv.config({
    path: '../.env'
});

const isSsl = process.env.DB_SSL_MODE === 'true' ? true : undefined;

let sslParams: TlsOptions;

if (isSsl) {
    const base64data = process.env.DB_CA_CERT;
    const buff = Buffer.from(base64data, 'base64');
    const sslCert = buff.toString('ascii');

    sslParams = {
        rejectUnauthorized: true,
        ca: sslCert
    };
}

const config = {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'root',
    ssl: isSsl ? sslParams : undefined,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    entities: Entities,
    // autoLoadEntities: true, // Note: possible to use instead: entities: Entities,
    logging: 'all',
    logger: 'file', // Removes console logging, instead logs all queries in a file ormlogs.log
    synchronize: false, // We are using migrations, synchronize should be set to false.
    uuidExtension: 'pgcrypto',
    migrationsRun: true,
    migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
    cli: {
        migrationsDir: path.join(__dirname, 'migrations')
    }
} as any;

export default new DataSource(config);
