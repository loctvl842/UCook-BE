import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Ingredient from '@database/entities/Ingredient';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    const ingredient = this.ingredientRepo.create(createIngredientDto);
    return this.ingredientRepo.save(ingredient);
  }

  findAll() {
    return this.ingredientRepo.find();
  }

  findOne(id: string) {
    return this.ingredientRepo.findOne({ where: { id } });
  }

  update(id: string, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientRepo.update(id, updateIngredientDto);
  }

  remove(id: string) {
    return this.ingredientRepo.delete(id);
  }
}
