import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateRecipeDto {
  @ApiProperty({ example: 'Classic Aglio e Olio' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'a1497e24-04e1-4942-8949-c9fcb034a77d' })
  @IsUUID()
  dishId: string;
}
