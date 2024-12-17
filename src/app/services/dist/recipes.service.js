"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipesService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var rxjs_1 = require("rxjs");
var RecipesService = /** @class */ (function () {
    function RecipesService(http) {
        this.http = http;
    }
    RecipesService.prototype.getRecentRecipePagination = function (page, pageSize) {
        return this.http.get(environment_1.environment.apiBaseUrl + "recipes?page=" + page + "&pageSize=" + pageSize)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    RecipesService.prototype.getRecipePaginationByKeyword = function (keyword, page, pageSize) {
        return this.http.get(environment_1.environment.apiBaseUrl + "recipes/search?keyword=" + keyword + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    RecipesService.prototype.getFullRecipeById = function (recipeId) {
        return this.http.get(environment_1.environment.apiBaseUrl + "recipes/" + recipeId)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    RecipesService.prototype.upload = function (formData) {
        return this.http.post(environment_1.environment.apiBaseUrl + "recipes/upload", formData)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    RecipesService.prototype.postSharedRecipe = function (recipeForm) {
        var recipe = recipeForm.value;
        return this.http.post(environment_1.environment.apiBaseUrl + "Recipes/share", recipe)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    RecipesService.prototype.handleError = function (error) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error("Backend returned code " + error.status + ", body was: ", error.error);
        }
        // Return an observable with a user-facing error message.
        return rxjs_1.throwError(function () { return new Error('Something bad happened; please try again later.'); });
    };
    RecipesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RecipesService);
    return RecipesService;
}());
exports.RecipesService = RecipesService;
