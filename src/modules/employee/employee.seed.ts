import { Connection } from 'typeorm';
import { Employee } from './employee.entity';

export const createEmployees = async (
	connection: Connection
): Promise<Employee[]> => {
	const employees = new Array<Employee>();

	const employee1 = new Employee();
	employee1.firstName = 'Ruslan';
	employee1.lastName = 'K.';
	employees.push(employee1);

	const employee2 = new Employee();
	employee2.firstName = 'Rahul';
	employee2.lastName = 'R.';
	employees.push(employee2);

	return await insertEmployees(connection, employees);
};

const insertEmployees = async (
	connection: Connection,
	employees: Employee[]
) => {
	const repo = connection.getRepository(Employee);

	await Promise.all(
		employees.map(async (emp) => {
			const existed = await repo.findOne({
				where: {
					firstName: emp.firstName,
					lastName: emp.lastName,
				},
			});

			if (existed) {
				emp.id = existed.id;
			}
		})
	);

	return await repo.save(employees);
};
