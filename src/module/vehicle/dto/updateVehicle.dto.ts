import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
  IsAlphanumeric,
  IsNumberString,
} from 'class-validator';

export class UpdateWallet {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsOptional()
  @IsAlphanumeric()
  readonly userContractAddress: string;

  @IsBoolean()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly isAutomated: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly targetCollateralRatio: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly triggerCollateralRatio: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNumberString()
  @IsAlphanumeric()
  readonly compoundStrategies: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNumberString()
  @IsAlphanumeric()
  readonly loanCompoundingTarget: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNumberString()
  @IsAlphanumeric()
  readonly stabilityCompounding: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNumberString()
  @IsAlphanumeric()
  readonly stakingCompounding: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNumberString()
  @IsAlphanumeric()
  readonly loanPaydown: string;
}
