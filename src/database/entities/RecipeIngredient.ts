import { ManyToOne, Relation, JoinColumn, Entity } from 'typeorm'
import CoreRecipeIngredient from '../__entities__/CoreRecipeIngredient'
import type Ingredient from './Ingredient'
import type Recipe from './Recipe'

@Entity({ name: 'recipeIngredients' })
class RecipeIngredient extends CoreRecipeIngredient {
  @ManyToOne('Ingredient', 'recipeIngredients')
  @JoinColumn({ name: 'ingredientId', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_RecipeIngredient_ingredientId_Ingredient_id' })
  ingredient: Relation<Ingredient>

  @ManyToOne('Recipe', 'recipeIngredients')
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_RecipeIngredient_recipeId_Recipe_id' })
  recipe: Relation<Recipe>
}

export default RecipeIngredient;
