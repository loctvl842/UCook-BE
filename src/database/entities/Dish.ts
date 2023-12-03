import { OneToMany, Relation, Entity } from 'typeorm'
import CoreDish from '../__entities__/CoreDish'
import type Recipe from './Recipe'

@Entity({ name: 'dishes' })
class Dish extends CoreDish {
  @OneToMany('Recipe', 'dish')
  recipes: Relation<Recipe>
}

export default Dish;
