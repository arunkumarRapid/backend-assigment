import {
  Controller,
  Logger,
  Get,
  Post,
  Param,
  HttpException,
  Query,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './schemas/vehicle.schema';
import { CreateVehicle } from './dto/createVehicle.dto';

@Controller('vehicle')
@ApiTags('VEHICLE')
export class VehicleController {
  private readonly logger = new Logger('VehicleController');
  constructor(public readonly vehicleService: VehicleService) {}

  /**
   *
   * @description Call Api For Add Vehicle in Record
   * @returns boolean Vehicle[]
   * @author Arun Kumar
   */
  @ApiOperation({
    summary: 'Stor Vehicle',
    description: 'Call Api For Add Vehicle in Record',
  })
  @Post('/')
  async createVehicle(
    @Body() createVehicle: CreateVehicle,
  ): Promise<{ data: Vehicle; status: number }> {
    try {
      const result = await this.vehicleService.createVehicle(createVehicle);
      return { data: result, status: 200 };
    } catch (error) {
      throw new HttpException(error, !error.status ? 500 : error.status);
    }
  }

  /**
   *
   * @description Call Api For Get Vehicle from Record depends query
   * @returns boolean Vehicle[]
   * @author Arun Kumar
   */
  @ApiOperation({
    summary: 'Get Vehicle',
    description: 'Call Api For Add Vehicle in Record',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description:
      'pass only date it compare greater and equal. Ex:- 2022-12-14T08:33:19.954Z',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Ex:- { "productionDate": -1 }',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Ex:- return data acording to offset, Default 0',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Ex:- Default 10',
  })
  @Get('/')
  async vehicles(
    @Query('filter') filter: any,
    @Query('sort') sort: any,
    @Query('offset') offset: any,
    @Query('limit') limit: any,
  ): Promise<{ data: Vehicle[]; count: number; status: number }> {
    try {
      filter = filter ? filter : null;
      try {
        sort = sort
          ? JSON.parse(sort)
          : { 'participantLoser.participantAmount': -1 };
      } catch (error) {
        throw new HttpException('Invalid sort query.', 400);
      }
      try {
        limit = limit ? parseInt(limit) : 10;
      } catch (error) {
        throw new HttpException('Invalid limit query.', 400);
      }
      try {
        offset = offset ? parseInt(offset) : 0;
      } catch (error) {
        throw new HttpException('Invalid offset query.', 400);
      }
      const data = await this.vehicleService.vehicles(
        filter,
        sort,
        limit,
        offset,
      );
      return { data: data, count: data.length, status: 200 };
    } catch (error) {
      throw new HttpException(error, !error.status ? 500 : error.status);
    }
  }

  /**
   *
   * @description Call Api For Get Vehicle average price till now
   * @returns number
   * @author Arun Kumar
   */
  @ApiOperation({
    summary: 'Get Vehicle average price',
    description: 'Call Api For Get Vehicle average price till now',
  })
  @Get('/average-price')
  async avgPrice(): Promise<{ data: number; status: number }> {
    try {
      const data = await this.vehicleService.avgPrice();
      return { data: data, status: 200 };
    } catch (error) {
      throw new HttpException(error, !error.status ? 500 : error.status);
    }
  }
}
