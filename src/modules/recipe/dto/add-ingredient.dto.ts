import { ApiProperty } from '@nestjs/swagger';
import { IsExist } from '@utils/validators/is-exists.validator';
import { IsNumber, IsString, IsUUID, Validate } from 'class-validator';

export class AddIngredientDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  step: number;

  @ApiProperty({ example: '5gr' })
  @IsString()
  amount: string;
}
