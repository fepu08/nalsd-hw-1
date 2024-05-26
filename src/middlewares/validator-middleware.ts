import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { vehicleSchema } from '../api/v1/vehicles/vehicle-schema';

const uuidSchema = Joi.string().guid({ version: 'uuidv4' });
const searchQuerySchema = Joi.object({
  q: Joi.string().min(1).required(),
});

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

function validate(schema: Joi.AnySchema, context: 'body' | 'params' | 'query') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[context]);
    if (error) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
}

export const validateVehicleBody = validate(vehicleSchema, 'body');
export const validateUUIDParam = validate(uuidSchema, 'params');
export const validateSearchQuery = validate(searchQuerySchema, 'query');
