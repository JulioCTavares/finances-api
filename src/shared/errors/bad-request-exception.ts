import { BaseException } from './base-exception'

export class BadRequestException extends BaseException {
    constructor(message: string, details?: any) {
        super(message, 400, details)
    }
}
