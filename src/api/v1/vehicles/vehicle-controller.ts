import { Request, Response, NextFunction } from 'express';
import { DebugLogger } from '../../../logger/controller-logger';
import { VehicleService } from './vehicle-service';
import { VehicleCreationAttributes } from './vehicle-model';

export class VehicleController {
  @DebugLogger()
  public static async getVehicleByKeyword(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const keyword = req.query.q as string;
    const vehicles = await VehicleService.searchVehiclesUsingKeyword(keyword);

    res.status(200).json(vehicles);
  }

  @DebugLogger()
  public static async getVehicleById(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const response = await VehicleService.getVehicleById(req.params.uuid);
    if (response === null) {
      res.status(404).send();
      return;
    }
    res.status(200).json(response);
  }

  @DebugLogger()
  public static async getVehicleCount(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const count = await VehicleService.getVehicleCount();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(count.toString());
  }

  @DebugLogger()
  public static async addVehicle(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const response = await VehicleService.addVehicle(
      req.body as VehicleCreationAttributes,
    );
    res.status(201).location(`/jarmuvek/${response.uuid}`).json(response);
  }
}
