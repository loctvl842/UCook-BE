/**
 * AUTO-GENERATED CODE - DO NOT MODIFY
 *
 * This file, 'CoreRecipeIngredient.ts', is generated automatically from the source database schema (DBML).
 * It defines the database table structure and is meant to be kept consistent with the database schema.
 * Any changes to the table structure should be made in the original DBML source and then regenerated.
 *
 * Generated on: 12/03/2023, 12:37:31 PM GMT+7
 * Author: loctvl842 - loclepnvx@gmail.com
 *
 * To define TypeORM-specific configurations or relationships for the 'Movie' entity, please refer to 'Movie.ts'.
 */

import { PrimaryColumn, Column } from 'typeorm'

abstract class CoreRecipeIngredient {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string

  @Column({ name: 'step', type: 'integer', nullable: true })
  step: any

  @Column({ name: 'amount', type: 'varchar', nullable: true })
  amount: string

  @Column({ name: 'ingredientId', type: 'uuid', nullable: true })
  ingredientId: string

  @Column({ name: 'recipeId', type: 'uuid', nullable: true })
  recipeId: string
}

export default CoreRecipeIngredient;