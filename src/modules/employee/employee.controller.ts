import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Crud({
	model: {
		type: Employee,
	},
	params: {
		id: {
			field: 'id',
			primary: true,
			type: 'uuid',
		},
	},
})
@Controller('api/employee')
export class EmployeeController implements CrudController<Employee> {
	constructor(public readonly service: EmployeeService) {}
}
