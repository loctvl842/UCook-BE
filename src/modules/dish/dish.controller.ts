import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateRecipeDto } from '@modules/recipe/dto/create-recipe.dto';
import { RecipeService } from '@modules/recipe/recipe.service';

@ApiTags('Dish')
@Controller('dish')
export class DishController {
  constructor(
    private readonly dishService: DishService,
    private readonly recipeService: RecipeService,
  ) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(id);
  }

  @Post(':id/recipe')
  createRecipe(
    @Param('id') id: string,
    @Body() createRecipeDto: Omit<CreateRecipeDto, 'dishId'>,
  ) {
    return this.recipeService.create({
      dishId: id,
      ...createRecipeDto,
    });
  }

  @Get(':id/recipe')
  findAllRecipes(@Param('id') id: string) {
    return this.recipeService.findAll(id);
  }
}
