import {
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class Base {
	@ApiPropertyOptional({ type: () => String })
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	// When record was created in our DB
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2022-11-21T06:22:34.234Z',
	})
	@CreateDateColumn()
	createdAt?: Date;

	// When record was updated in our DB
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2022-11-21T06:22:34.234Z',
	})
	@UpdateDateColumn()
	updatedAt?: Date;

	// Indicates if record is active now
	@ApiPropertyOptional({ type: Boolean, default: true })
	@Column({ nullable: false, default: true })
	isActive: boolean;

	// Indicate if record is archived
	@ApiPropertyOptional({ type: Boolean, default: false })
	@Column({ nullable: false, default: false })
	isArchived: boolean;
}
