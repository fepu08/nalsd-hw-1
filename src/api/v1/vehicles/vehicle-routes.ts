import { Router } from 'express';
import { asyncHandler } from '../../../utils';
import { VehicleController } from './vehicle-controller';

const vehicleRouter = Router();

// I'd add it to vehicle router but the requirements says it should use different path though its logic related here...
const searchVehicleRouter = Router();

vehicleRouter
  .route('/')
  .get(asyncHandler(VehicleController.getVehicleCount))
  .post(asyncHandler(VehicleController.addVehicle));

vehicleRouter
  .route('/:uuid')
  .get(asyncHandler(VehicleController.getVehicleById));

searchVehicleRouter
  .route('/')
  .get(asyncHandler(VehicleController.getVehicleByKeyword));

export { vehicleRouter, searchVehicleRouter };
