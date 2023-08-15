import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigurationService } from './config/config';
import { SeedDataService } from './modules/seeds/seed.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(
		private readonly seedDataService: SeedDataService,
		private readonly configService: ConfigurationService
	) {}

	async ping(): Promise<void> {
		console.log('AppService ping');
	}

	async onApplicationBootstrap(): Promise<void> {
		// Seed DB with default data, if it's empty
		await this.seedDataService.executeSeed(true);

		if (!this.configService.isProduction()) {
			console.log(
				'AppService onApplicationBootstrap run one time on app start'
			);
		}
	}
}
