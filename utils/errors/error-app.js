export class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 'fail';
    this.isCustom = true;
    this.isOperational = true;
  }
}
