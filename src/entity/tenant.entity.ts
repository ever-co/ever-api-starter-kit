import { Column, Entity, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Base } from '../core/entities/base.entity';

@Entity('tenant')
export class Tenant extends Base {
	// The name or title of the tenant organization.
	@ApiProperty({ type: () => String })
	@Index()
	@Column()
	name: string;

	// The logo of the tenant organization.
	@ApiPropertyOptional({ type: () => String })
	@Column({ nullable: true })
	logo: string;
}
