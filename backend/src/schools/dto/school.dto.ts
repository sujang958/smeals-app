import { IsString } from 'class-validator';

export class SchoolDto {
  @IsString()
  readonly code: string;
  @IsString()
  readonly scCode: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly where: string;
  @IsString()
  readonly site: string;
}
