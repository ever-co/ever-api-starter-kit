import { APP_GUARD } from '@nestjs/core';
import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth.middleware';
import { AuthGuard } from './auth.guard';
import { TenantApiKeyService } from './tenant-api-key.service';
import { TenantApiKey } from './../../entity';

@Module({
	imports: [TypeOrmModule.forFeature([TenantApiKey])],
	controllers: [],
	providers: [
		AuthMiddleware,
		TenantApiKeyService,
		// This will lock all routes and make them accessible by authenticated users only.
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	exports: [TypeOrmModule, TenantApiKeyService],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}
