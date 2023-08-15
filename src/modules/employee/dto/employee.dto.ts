import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IBaseDTO } from '../../../core/dto/base.dto';
import {
	Field,
	ID,
	ObjectType,
	GraphQLISODateTime,
	InputType,
} from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType('Employee')
@InputType('EmployeeInput')
export class EmployeeDTO implements IBaseDTO {
	@FilterableField(() => ID, { nullable: true })
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID()
	id?: string;

	@FilterableField(() => String, { nullable: true })
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	firstName?: string;

	@FilterableField(() => String, { nullable: true })
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	lastName?: string;

	@Field({ nullable: true })
	name?: string;

	// When record was created in our DB
	@FilterableField(() => GraphQLISODateTime, { nullable: true })
	@ApiPropertyOptional({
		type: 'string',
		format: 'date-time',
		example: '2022-11-21T04:22:36.242Z',
	})
	@IsOptional()
	createdAt?: Date;

	// When record was updated in our DB
	@FilterableField(() => GraphQLISODateTime, { nullable: true })
	@ApiPropertyOptional({
		type: 'string',
		format: 'date-time',
		example: '2022-11-21T04:22:36.242Z',
	})
	@IsOptional()
	updatedAt?: Date;

	// Indicates if record is active now
	@FilterableField(() => Boolean, { nullable: false })
	@ApiProperty({ type: Boolean, default: true })
	isActive: boolean;

	// Indicate if record is archived
	@FilterableField(() => Boolean, { nullable: false })
	@ApiProperty({ type: Boolean, default: false })
	isArchived: boolean;
}
