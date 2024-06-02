export class EmptySearchStringError extends Error {
  constructor() {
    super('Empty search string');
    Object.setPrototypeOf(this, EmptySearchStringError.prototype);
    this.name = 'EmptySearchStringError';
  }
}
