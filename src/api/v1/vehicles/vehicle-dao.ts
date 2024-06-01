import { Op, Sequelize } from 'sequelize';
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

  public static getCount = async () => {
    return await VehicleModel.count();
  };

  public static searchVehicle = async (keyword: string) => {
    const escapedKeyword = escapeKeyword(keyword);
    const keywordPattern = `%${escapedKeyword}%`;

    return await VehicleModel.findAll({
      where: {
        [Op.or]: [
          { rendszam: { [Op.iLike]: keywordPattern } },
          { tulajdonos: { [Op.iLike]: keywordPattern } },
          Sequelize.literal(
            `EXISTS (SELECT 1 FROM unnest("adatok") AS adatok WHERE adatok ILIKE '${keywordPattern}')`,
          ),
        ],
      },
    });
  };
}

function escapeKeyword(keyword: string): string {
  return keyword.replace(/'/g, "''"); // Escape single quotes
}
