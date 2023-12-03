import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDishDto {
  @ApiProperty({ example: 'Spaghetti Aglio e Olio' })
  @IsString()
  name: string;
}
