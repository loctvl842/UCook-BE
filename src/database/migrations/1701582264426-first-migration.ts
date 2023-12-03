import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1701582264426 implements MigrationInterface {
    name = 'FirstMigration1701582264426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "dishes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "recipes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "dishId" uuid,
                CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "recipeIngredients" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "step" integer,
                "amount" character varying,
                "ingredientId" uuid,
                "recipeId" uuid,
                CONSTRAINT "PK_ecaebe4b31167529f9c0406ea3c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ingredients" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes"
            ADD CONSTRAINT "FK_Recipe_dishId_Dish_id" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeIngredients"
            ADD CONSTRAINT "FK_RecipeIngredient_ingredientId_Ingredient_id" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeIngredients"
            ADD CONSTRAINT "FK_RecipeIngredient_recipeId_Recipe_id" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipeIngredients" DROP CONSTRAINT "FK_RecipeIngredient_recipeId_Recipe_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeIngredients" DROP CONSTRAINT "FK_RecipeIngredient_ingredientId_Ingredient_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes" DROP CONSTRAINT "FK_Recipe_dishId_Dish_id"
        `);
        await queryRunner.query(`
            DROP TABLE "ingredients"
        `);
        await queryRunner.query(`
            DROP TABLE "recipeIngredients"
        `);
        await queryRunner.query(`
            DROP TABLE "recipes"
        `);
        await queryRunner.query(`
            DROP TABLE "dishes"
        `);
    }

}
