import { QueryService, InjectQueryService } from '@ptc-org/nestjs-query-core';
import {
	CRUDResolver,
	InjectPubSub,
	GraphQLPubSub,
} from '@ptc-org/nestjs-query-graphql';
import { Resolver } from '@nestjs/graphql';
import { EmployeeDTO } from '../dto/employee.dto';
import { Employee } from '../employee.entity';

@Resolver(() => EmployeeDTO)
export class EmployeeResolver extends CRUDResolver(EmployeeDTO, {
	delete: { disabled: true },
	enableAggregate: true,
	enableTotalCount: true,
}) {
	constructor(
		@InjectQueryService(Employee) readonly service: QueryService<Employee>,
		@InjectPubSub() readonly pubSub: GraphQLPubSub,
	) {
		super(service);
	}
}
