// auth.guard.ts
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ContextType,
	UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Check if the environment variable 'IS_DISABLE_AUTH' is set to 'true'
		const IS_DISABLE_AUTH =
			process.env.IS_DISABLE_AUTH === 'true' ? true : false;

		// Perform a conditional check to determine whether to disable authentication
		if (!IS_DISABLE_AUTH) {
			const request = this.getRequest(context);
			const apiKey = request.headers['x-app-id'];
			const apiSecret = request.headers['x-api-key'];

			if (!apiKey || !apiSecret) {
				throw new UnauthorizedException(
					'API key and secret keys are required.',
				);
			}

			// Return true to allow the request to proceed, or false to deny access
			return !!request.tenant;
		}

		// If IS_DISABLE_AUTH is true, then authentication is disabled
		return true;
	}

	/**
	 * Get the request object from the provided ExecutionContext.
	 * If the context is of type 'graphql', it returns the request object from the GraphQL context.
	 * For HTTP-based contexts, it returns the request object from the HTTP context.
	 * For other types of contexts, it returns undefined.
	 *
	 * @param context The ExecutionContext representing the current request context.
	 * @returns The request object extracted from the context, or undefined if the context type is not supported.
	 */
	getRequest(context: ExecutionContext): any {
		// Check if the context type is 'graphql'
		if (context.getType<ContextType | 'graphql'>() === 'graphql') {
			// Extract the request object from the GraphQL context
			return GqlExecutionContext.create(context).getContext().req;
		}
		// If the context is not 'graphql', assume it is an HTTP-based context
		// Extract the request object from the HTTP context
		return context.switchToHttp().getRequest();
	}
}
