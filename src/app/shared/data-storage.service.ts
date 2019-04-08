import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put(
      'https://max-angular-tutorial-project.firebaseio.com/recipes.json?auth=',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.httpClient
      .get<Recipe[]>(
        'https://max-angular-tutorial-project.firebaseio.com/recipes.json?auth=' +
          token
      ).pipe(
      map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      }))
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
