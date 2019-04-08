import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    // const token = this.authService.getToken();

    return this.httpClient.put(
      'https://max-angular-tutorial-project.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    return this.httpClient
      .get<Recipe[]>('https://max-angular-tutorial-project.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      })
      .map((response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      })
      .subscribe(
          (recipes) => {
              this.recipeService.setRecipes(recipes);
          }
      );
  }
}
