import { VehicleCreationAttributes, VehicleModel } from './vehicle-model';

export class VehicleDAO {
  public static vehicleExists = async (rendszam: string): Promise<boolean> => {
    const vehicle = await VehicleModel.findOne({
      where: { rendszam },
    });
    return vehicle !== null;
  };

  public static createVehicle = async (
    vehicleData: VehicleCreationAttributes,
  ) => {
    return await VehicleModel.create(vehicleData);
  };

  public static getVehicleByUUID = async (uuid: string) => {
    return await VehicleModel.findByPk(uuid);
  };
}
