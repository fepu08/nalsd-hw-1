import Joi from 'joi';
import { VehicleAttributes } from './vehicle-model';

export const vehicleSchema = Joi.object<VehicleAttributes>({
  rendszam: Joi.string().required().max(20),
  tulajdonos: Joi.string().required().max(200),
  forgalmi_ervenyes: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': `"forgalmi_ervenyes" must be in the format YYYY-MM-DD`,
      'string.empty': `"forgalmi_ervenyes" cannot be an empty field`,
      'any.required': `"forgalmi_ervenyes" is a required field`,
    }),
  adatok: Joi.array().items(Joi.string().max(200)).max(200),
});
