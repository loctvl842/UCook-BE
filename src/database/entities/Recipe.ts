import { ManyToOne, Relation, JoinColumn, OneToMany, Entity } from 'typeorm'
import CoreRecipe from '../__entities__/CoreRecipe'
import type Dish from './Dish'
import type RecipeIngredient from './RecipeIngredient'

@Entity({ name: 'recipes' })
class Recipe extends CoreRecipe {
  @ManyToOne('Dish', 'recipes')
  @JoinColumn({ name: 'dishId', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Recipe_dishId_Dish_id' })
  dish: Relation<Dish>

  @OneToMany('RecipeIngredient', 'recipe')
  recipeIngredients: Relation<RecipeIngredient>
}

export default Recipe;
