import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { vehicleSchema } from '../api/v1/vehicles/vehicle-schema';

const uuidSchema = Joi.string().guid({ version: 'uuidv4' }).messages({
  'string.base': 'Invalid type, expected a string',
  'string.guid': 'Invalid UUID',
});

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

function validate(
  schema: Joi.AnySchema,
  context: 'body' | 'params' | 'query',
  statusCode: number = 400,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[context]);
    if (error) {
      res.status(statusCode).json(errorResponse(error.details));
    } else {
      next();
    }
  };
}

//export const validateUUIDParam = validate(uuidSchema, 'params', 404);
export const validateVehicleBody = validate(vehicleSchema, 'body');
export const validateSearchQuery = validate(searchQuerySchema, 'query');
