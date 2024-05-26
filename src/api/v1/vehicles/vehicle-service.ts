import { VehicleAlreadyExistsError } from '../../../errors/vehicle-already-exists-error';
import { VehicleDAO } from './vehicle-dao';
import { VehicleCreationAttributes } from './vehicle-model';

export class VehicleService {
  public static async addVehicle(body: VehicleCreationAttributes) {
    if (await VehicleDAO.vehicleExists(body.rendszam)) {
      throw new VehicleAlreadyExistsError(body.rendszam);
    }

    return await VehicleDAO.createVehicle(body);
  }

  public static async getVehicleCount() {}

  public static async getVehicleById(uuid: string) {
    return await VehicleDAO.getVehicleByUUID(uuid);
  }

  public static async searchVehiclesUsingKeyword() {}
}
