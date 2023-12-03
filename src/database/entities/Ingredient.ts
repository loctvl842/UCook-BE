import { OneToMany, Relation, Entity } from 'typeorm'
import CoreIngredient from '../__entities__/CoreIngredient'
import type RecipeIngredient from './RecipeIngredient'

@Entity({ name: 'ingredients' })
class Ingredient extends CoreIngredient {
  @OneToMany('RecipeIngredient', 'ingredient')
  recipeIngredients: Relation<RecipeIngredient>
}

export default Ingredient;
