import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
	env: process.env.NODE_ENV,
	dbType: process.env.DB_TYPE || 'postgres',
	isNotSLS: process.env.IS_NOT_SLS,
	state: process.env.STAGE,
	region: process.env.REGION,
	service: process.env.SERVICE,
}));

@Injectable()
export class ConfigurationService {
	constructor(private readonly configService: ConfigService) {}

	public isProduction(): boolean {
		return this.configService.get<string>('config.env') == 'production';
	}

	public dbType(): string | undefined {
		return this.configService.get<string>('config.dbType');
	}

	public isNotSLS(): boolean {
		return this.configService.get<boolean>('config.isNotSLS') == true;
	}
}
