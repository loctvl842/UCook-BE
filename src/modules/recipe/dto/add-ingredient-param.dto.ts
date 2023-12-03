import { ApiProperty } from '@nestjs/swagger';
import { IsExist } from '@utils/validators/is-exists.validator';
import { IsUUID, Validate } from 'class-validator';

export class AddIngredientParamDto {
  @ApiProperty({ example: 'a1497e24-04e1-4942-8949-c9fcb034a77d' })
  @IsUUID()
  @Validate(IsExist, ['Recipe', 'id'], {
    message: 'Recipe not found',
  })
  id: string;

  @ApiProperty({ example: 'a1497e24-04e1-4942-8949-c9fcb034a77d' })
  @IsUUID()
  @Validate(IsExist, ['Ingredient', 'id'], {
    message: 'Ingredient not found',
  })
  ingredientId: string;
}
