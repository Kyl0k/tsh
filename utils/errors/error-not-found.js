import { AppError } from './error-app.js';

export class NotFoundError extends AppError {
  constructor(message = 'Data you are searching for is not found') {
    super(message);
    this.statusCode = 404;
  }
}
