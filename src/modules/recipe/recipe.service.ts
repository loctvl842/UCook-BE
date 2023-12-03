import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Recipe from '@database/entities/Recipe';
import { Repository } from 'typeorm';
import { AddIngredientDto } from './dto/add-ingredient.dto';
import RecipeIngredient from '@database/entities/RecipeIngredient';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepo: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepo: Repository<RecipeIngredient>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipeRepo.create(createRecipeDto);
    return this.recipeRepo.save(recipe);
  }

  findAll(dishId: string) {
    return this.recipeRepo.find({ where: { dishId } });
  }

  findOne(id: string) {
    return this.recipeRepo.findOne({
      where: { id },
      relations: ['recipeIngredients'],
    });
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepo.update(id, updateRecipeDto);
  }

  remove(id: string) {
    return this.recipeRepo.delete(id);
  }

  async addIngredient(
    recipeId: string,
    ingredientId: string,
    addIngredientDto: AddIngredientDto,
  ) {
    const recipeIngredient = this.recipeIngredientRepo.create({
      recipeId,
      ingredientId,
      ...addIngredientDto,
    });
    return this.recipeIngredientRepo.save(recipeIngredient);
  }
}
