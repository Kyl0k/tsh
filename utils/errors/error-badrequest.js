import { AppError } from './error-app.js';

export class BadRequestError extends AppError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
