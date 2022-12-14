import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateVehicle {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsAlphanumeric()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  readonly type: string;

  @IsDateString()
  @ApiProperty()
  @IsNotEmpty()
  readonly productionDate: string;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly price: number;
}
