// auth.middleware.ts
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { createHash, timingSafeEqual } from 'crypto';
import { CustomRequest } from './../../core/interfaces';
import { AuthMethod } from './../../core/enums';
import { TenantApiKeyService } from './tenant-api-key.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly tenantApiKeyService: TenantApiKeyService) {}

	async use(
		req: CustomRequest,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		// Check if the environment variable 'IS_DISABLE_AUTH' is set to 'true'
		const IS_DISABLE_AUTH =
			process.env.IS_DISABLE_AUTH === 'true' ? true : false;

		// Perform a conditional check to determine whether to disable authentication
		if (!IS_DISABLE_AUTH) {
			// If IS_DISABLE_AUTH is false or undefined, authentication continues as usual
			// The middleware will proceed with the authentication process
			const apiKey = req.header('X-APP-ID');
			const apiSecret = req.header('X-API-KEY');

			if (!apiKey || !apiSecret) {
				throw new ForbiddenException(
					'API key and secret key are required.',
				);
			}

			// Retrieve the corresponding tenant_api_key record based on the apiKey
			const tenantApiKey = await this.tenantApiKeyService.findApiKey(
				apiKey,
			);

			if (
				!tenantApiKey ||
				!this.validateApiKey(apiSecret, tenantApiKey.apiSecret)
			) {
				throw new ForbiddenException('Invalid API key or secret.');
			}

			// Attach the tenant to the request for further usage in the application
			req.tenant = tenantApiKey?.tenant || null;

			// Attach the authentication method to the request for further usage in the application
			req.authMethod = AuthMethod.ApiKey;
		}

		// Call the 'next()' function to pass control to the next middleware or route handler
		next();
	}

	/**
	 * Validate the provided secret key against the stored API secret.
	 * @param secretKey The secret key provided in the request.
	 * @param apiSecret The stored API secret fetched from the database.
	 * @returns true if the provided secret key matches the stored API secret, false otherwise.
	 */
	private validateApiKey(secretKey: string, apiSecret: string): boolean {
		// Hash the provided API key using the same hashing algorithm used to hash the stored API secret
		const hashedApiKey = this.hashApiKey(secretKey);

		console.log(hashedApiKey, 'Hashed Secret Key');
		console.log(apiSecret, 'Tenant Hashed API Secret');

		// Use a constant-time comparison to avoid timing attacks
		return timingSafeEqual(
			Buffer.from(hashedApiKey),
			Buffer.from(apiSecret),
		);
	}

	/**
	 * Hash the provided secret key using the 'sha256' hashing algorithm.
	 * @param secretKey The secret key to be hashed.
	 * @returns The hashed secret key as a hexadecimal string.
	 */
	private hashApiKey(secretKey: string): string {
		// Use the 'sha256' hashing algorithm (you can choose other algorithms as well)
		const hash = createHash('sha256').update(secretKey);
		return hash.digest('hex');
	}
}
