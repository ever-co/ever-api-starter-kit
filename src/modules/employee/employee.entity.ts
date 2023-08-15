import { Entity, Column, Index, AfterLoad, Unique } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TenantOrganizationBaseEntity } from '../../core/entities/tenant-organization-base.entity';

@Entity('employee')
@Unique(['tenantId', 'orgId', 'firstName', 'lastName'])
export class Employee extends TenantOrganizationBaseEntity {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	firstName?: string;

	@ApiPropertyOptional({ type: String })
	@IsString()
	@Index()
	@IsOptional()
	@Column({ nullable: true })
	lastName?: string;

	name?: string;

	@AfterLoad()
	afterLoad?(): void {
		const name = [this.firstName, this.lastName].filter(Boolean).join(' ');
		this.name = name;
	}
}
