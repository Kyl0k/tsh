export class ProgrammerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 'error';
    this.isCustom = true;
    this.isProgrammer = true;
  }
}
