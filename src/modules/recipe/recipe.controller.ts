import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddIngredientDto } from './dto/add-ingredient.dto';
import { AddIngredientParamDto } from './dto/add-ingredient-param.dto';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }

  @Post(':id/ingredient/:ingredientId')
  addIngredient(
    @Param() params: AddIngredientParamDto,
    @Body()
    addIngredientDto: AddIngredientDto,
  ) {
    return this.recipeService.addIngredient(
      params.id,
      params.ingredientId,
      addIngredientDto,
    );
  }
}
