import { Column, Index, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Base } from './base.entity';
import { Tenant } from './../../entity';

export abstract class TenantBaseEntity extends Base {
	@ApiPropertyOptional({ type: () => Tenant })
	@ManyToOne(() => Tenant, {
		nullable: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	tenant?: Tenant;

	@ApiPropertyOptional({ type: () => String })
	@RelationId((it: TenantBaseEntity) => it.tenant)
	@Index()
	@Column({ nullable: true })
	tenantId?: Tenant['id'];
}
