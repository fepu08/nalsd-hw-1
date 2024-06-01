import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/sequelize-config';

export interface VehicleAttributes {
  uuid: string;
  rendszam: string;
  tulajdonos: string;
  forgalmi_ervenyes: string;
  adatok: string[];
}

export interface VehicleCreationAttributes
  extends Omit<VehicleAttributes, 'uuid'> {}

class Vehicle extends Model<VehicleAttributes, VehicleCreationAttributes> {
  declare uuid: string;
  declare rendszam: string;
  declare tulajdonos: string;
  declare forgalmi_ervenyes: string;
  declare adatok: string[];
}

Vehicle.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    rendszam: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tulajdonos: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    forgalmi_ervenyes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adatok: {
      type: DataTypes.ARRAY(DataTypes.STRING(200)),
      validate: {
        len: [0, 200],
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Vehicle',
    tableName: 'vehicles',
  },
);

export { Vehicle as VehicleModel };
