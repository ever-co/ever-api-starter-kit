// tenant-api-key.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '../../core/crud';
import { TenantApiKey } from '../../entity';

@Injectable()
export class TenantApiKeyService extends TenantAwareCrudService<TenantApiKey> {
	constructor(
		@InjectRepository(TenantApiKey)
		protected readonly tenantApiKeyRepository: Repository<TenantApiKey>,
	) {
		super(tenantApiKeyRepository);
	}

	/**
	 * Find a TenantApiKey based on the provided API key.
	 * @param apiKey The API key to search for.
	 * @returns A Promise that resolves to a TenantApiKey or null if not found.
	 */
	async findApiKey(apiKey: string): Promise<TenantApiKey | null> {
		try {
			const tenantApiKey = await this.tenantApiKeyRepository.findOne({
				where: {
					apiKey,
					isActive: true,
				},
				relations: ['tenant'],
			});
			return tenantApiKey || null;
		} catch (error) {
			// Handle any errors that may occur during the database query
			console.error('Error fetching tenant_api_key:', error.message);
			return null;
		}
	}
}
