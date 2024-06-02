import { EmptySearchStringError } from '../../../errors/empty-search-string-error';
import { VehicleAlreadyExistsError } from '../../../errors/vehicle-already-exists-error';
import { logger } from '../../../logger/logger';
import { RedisClient } from '../../../utils';
import { VehicleDAO } from './vehicle-dao';
import { VehicleAttributes, VehicleCreationAttributes } from './vehicle-model';

export class VehicleService {
  public static async addVehicle(body: VehicleCreationAttributes) {
    if (await VehicleDAO.vehicleExists(body.rendszam)) {
      throw new VehicleAlreadyExistsError(body.rendszam);
    }

    logger.debug('Put new vehicle to cache');
    const newVehicle = await VehicleDAO.createVehicle(body);
    await RedisClient.putToCache(newVehicle.uuid, JSON.stringify(newVehicle));
    return newVehicle;
  }

  public static async getVehicleCount() {
    return await VehicleDAO.getCount();
  }

  public static async getVehicleById(uuid: string) {
    const cachedVehicle = await RedisClient.getCached(uuid);
    if (cachedVehicle) {
      logger.debug(`Returning cached vehicle: ${cachedVehicle}`);
      return JSON.parse(cachedVehicle) as VehicleAttributes;
    }
    logger.debug('Returning vehicle from database');
    return await VehicleDAO.getVehicleByUUID(uuid);
  }

  public static async searchVehiclesUsingKeyword(keyword: string) {
    if (keyword.trim() === '') {
      throw new EmptySearchStringError();
    }

    return await VehicleDAO.searchVehicle(keyword);
  }
}
