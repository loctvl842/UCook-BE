import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Dish from '@database/entities/Dish';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishRepo: Repository<Dish>,
  ) {}

  create(createDishDto: CreateDishDto) {
    const dish = this.dishRepo.create(createDishDto);
    return this.dishRepo.save(dish);
  }

  findAll() {
    return this.dishRepo.find();
  }

  findOne(id: string) {
    return this.dishRepo.findOne({ where: { id } });
  }

  update(id: string, updateDishDto: UpdateDishDto) {
    return this.dishRepo.update(id, updateDishDto);
  }

  remove(id: string) {
    return this.dishRepo.delete(id);
  }
}
