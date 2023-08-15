import { Column, Index, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TenantBaseEntity } from './tenant-base.entity';
import { Organization } from './../../entity/organization.entity';

export abstract class TenantOrganizationBaseEntity extends TenantBaseEntity {
	@ApiPropertyOptional({ type: () => Organization })
	@ManyToOne(() => Organization, {
		nullable: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	org?: Organization;

	@ApiPropertyOptional({ type: () => String })
	@RelationId((it: TenantOrganizationBaseEntity) => it.org)
	@Index()
	@Column({ nullable: true })
	orgId?: Organization['id'];
}
