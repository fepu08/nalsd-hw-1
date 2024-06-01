export class VehicleAlreadyExistsError extends Error {
  constructor(rendszam: string) {
    super(`Vehicle already exists with rendszam: ${rendszam}`);
    Object.setPrototypeOf(this, VehicleAlreadyExistsError.prototype);
    this.name = 'VehicleAlreadyExistsError';
  }
}
