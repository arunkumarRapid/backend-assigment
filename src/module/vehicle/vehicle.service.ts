import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicle } from './dto/createVehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   *
   * @description Get Round Data From DB depends up roundContractId
   * @return Round
   * @param roundContractId
   * @author Arun Kumar
   */
  async createVehicle(createVehicle: CreateVehicle): Promise<Vehicle | any> {
    try {
      return await this.vehicleModel.create(createVehicle);
    } catch (error) {
      this.logger.error(VehicleService.name + '-createVehicle-' + error);
      throw new HttpException(error, !error.status ? 500 : error.status);
    }
  }

  /**
   *
   * @description Get Rounds Data From DB depends up filters
   * @return Round[]
   * @author Arun Kumar
   */
  async vehicles(
    filter: string,
    sort: any,
    limit: number,
    offset: number,
  ): Promise<Vehicle[] | any> {
    try {
      if (filter) {
        console.log(filter, 'filters', new Date(filter));
        return await this.vehicleModel
          .aggregate()
          .match({
            productionDate: { $gte: new Date(filter) },
          })
          .sort(sort)
          .skip(offset)
          .limit(limit)
          .exec();
      } else {
        return await this.vehicleModel
          .aggregate()
          .sort(sort)
          .skip(offset)
          .limit(limit)
          .exec();
      }
    } catch (error) {
      this.logger.error(VehicleService.name + '-vehicles-' + error);
      throw new HttpException(error, !error.status ? 500 : error.status);
    }
  }

  async avgPrice(): Promise<number | any> {
    try {
      return await this.vehicleModel
        .aggregate([
          {
            $group: {
              _id: '',
              avgAmount: { $avg: '$price' },
            },
          },
        ])
        .exec();
    } catch (error) {
      this.logger.error(VehicleService.name + '-vehicles-' + error);
      throw new HttpException(error, !error.status ? 500 : error.status);
    }
  }
}
