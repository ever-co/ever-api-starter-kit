// interfaces/custom-request.interface.ts
import { Request } from 'express';
import { AuthMethod } from '../enums/auth-method.enum';
import { ITenant } from './tenant.interface';

export interface CustomRequest extends Request {
	authMethod?: AuthMethod;
	tenant?: ITenant;
}
