import { Router } from 'express';
import { asyncHandler } from '../../../utils';
import { VehicleController } from './vehicle-controller';
import {
  validateUUIDParameter,
  validateVehicleBody,
} from '../../../middlewares/validator-middleware';

const vehicleRouter = Router();

// I'd add it to vehicle router but the requirements says it should use different path though its logic related here...
const searchVehicleRouter = Router();

vehicleRouter
  .route('/')
  .get(asyncHandler(VehicleController.getVehicleCount))

  .post(validateVehicleBody, asyncHandler(VehicleController.addVehicle));
vehicleRouter
  .route('/:uuid')
  .get(validateUUIDParameter, asyncHandler(VehicleController.getVehicleById));

searchVehicleRouter
  .route('/')
  .get(asyncHandler(VehicleController.getVehicleByKeyword));

export { vehicleRouter, searchVehicleRouter };
