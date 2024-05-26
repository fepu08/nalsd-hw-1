import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { vehicleSchema } from '../api/v1/vehicles/vehicle-schema';

function errorResponse(errorItems: Joi.ValidationErrorItem[]) {
  const errors = errorItems.map((error) => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: 'Failed',
    errors,
  };
}

function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error?.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      return next();
    }
  };
}

export const validateVehicle = validate(vehicleSchema);
