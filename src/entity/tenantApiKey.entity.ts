import { Entity, Column, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TenantBaseEntity } from '../core/entities/tenant-base.entity';

@Entity('tenant_api_key')
export class TenantApiKey extends TenantBaseEntity {
	@ApiProperty({ type: String })
	@IsString()
	@Index()
	@Column()
	apiKey: string;

	@ApiProperty({ type: String })
	@IsString()
	@Index()
	@Column()
	apiSecret: string;
}
