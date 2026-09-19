export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;


    constructor(message: string, statusCode: number, isOperational: boolean) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, true);
    }
}

export class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, true);
    }
}

export class AuthError extends AppError {
    constructor(message: string = 'Authentication required') {
        super(message, 401, true);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'You are not authorized to perform this action.') {
        super(message, 403, true)
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, true)
    }
}

// export class RateLimitError extends AppError {
//     constructor(message: string) {
//         super(message, 429, true)
//     }
// }

// export class ServerError extends AppError {
//     constructor(message: string) {
//         super(message, 500, true)
//     }
// }