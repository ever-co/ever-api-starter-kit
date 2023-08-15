import { NestFactory } from '@nestjs/core';
import { SeedDataService } from './seed.service';
import { SeedAppModule } from './seed.module';

export const Seed = async (isUpdate: boolean) => {
	const app = await NestFactory.create(SeedAppModule);
	await app.init();

	const seedDataService = app.get(SeedDataService);

	if (isUpdate) await seedDataService.executeUpdate(true);
	else await seedDataService.executeSeed(true);

	await app.close();
	process.exit(0);
};

(async () => {
	await Seed(false);
})();
