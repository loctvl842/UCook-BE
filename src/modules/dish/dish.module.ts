import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dish from '@database/entities/Dish';
import { RecipeService } from '@modules/recipe/recipe.service';
import Recipe from '@database/entities/Recipe';
import RecipeIngredient from '@database/entities/RecipeIngredient';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, Recipe, RecipeIngredient])],
  controllers: [DishController],
  providers: [DishService, RecipeService],
})
export class DishModule {}
