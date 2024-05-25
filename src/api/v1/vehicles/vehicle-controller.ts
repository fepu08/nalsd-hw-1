import { Request, Response, NextFunction } from 'express';
import { DebugLogger } from '../../../logger/controller-logger';

export class VehicleController {
  @DebugLogger()
  public static async getVehicleByKeyword(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const response = await Promise.resolve({ endpoint: 'getVehicleById' });
    res.status(200).json(response);
  }

  @DebugLogger()
  public static async getVehicleById(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const response = await Promise.resolve({ endpoint: 'getVehicleById' });
    res.status(200).json(response);
  }

  @DebugLogger()
  public static async getVehicleCount(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const response = await Promise.resolve({ endpoint: 'getVehicleById' });
    res.status(200).json(response);
  }

  @DebugLogger()
  public static async addVehicle(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const response = await Promise.resolve({ endpoint: 'getVehicleById' });
    res.status(201).location('/jarmuvek/mock-uuid-123').json(response);
  }
}
