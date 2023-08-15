import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

// Service responsible to register (and decommission) employees
@Injectable()
export class EmployeeService extends TypeOrmCrudService<Employee> {
	constructor(
		@InjectRepository(Employee) readonly repo: Repository<Employee>
	) {
		super(repo);
	}

	public async getActiveWithJobSearchCriteria(): Promise<Employee[]> {
		return await this.repo.find({
			where: { isActive: true, isArchived: false },
			relations: [],
		});
	}
}
