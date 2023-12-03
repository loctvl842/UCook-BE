import Ingredient from '@database/entities/Ingredient';
import Recipe from '@database/entities/Recipe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import RecipeIngredient from '@database/entities/RecipeIngredient';
import { IsExist } from '@utils/validators/is-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient, RecipeIngredient])],
  controllers: [RecipeController],
  providers: [IsExist, RecipeService],
})
export class RecipeModule {}
