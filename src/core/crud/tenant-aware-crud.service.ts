import { Repository } from 'typeorm';
import { TenantBaseEntity } from '../entities/tenant-base.entity';

export abstract class TenantAwareCrudService<T extends TenantBaseEntity> {
	protected constructor(protected readonly repository: Repository<T>) {}
}
