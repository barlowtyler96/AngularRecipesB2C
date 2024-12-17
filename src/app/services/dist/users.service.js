"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var environment_1 = require("src/environments/environment");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UsersService = /** @class */ (function () {
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.getUserFavoriteIds = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + "Users/favoritesIds")
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    UsersService.prototype.getUserFavorites = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + "Users/favorites")
            .pipe(rxjs_1.catchError(this.handleError));
    };
    UsersService.prototype.deleteUserFavorite = function (recipeId) {
        var url = environment_1.environment.apiBaseUrl + "Users/favorite/" + recipeId;
        return this.http["delete"](url)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    UsersService.prototype.addUserFavorite = function (recipeId) {
        var url = environment_1.environment.apiBaseUrl + "Users/favorite/" + recipeId;
        return this.http.post(url, {})
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    UsersService.prototype.getUserCreatedRecipes = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + "Users/myrecipes")
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    UsersService.prototype.postSharedRecipe = function (recipeForm) {
        var recipe = recipeForm.value;
        return this.http.post(environment_1.environment.apiBaseUrl + "Users/share", recipe)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(this.handleError));
    };
    UsersService.prototype.handleError = function (error) {
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
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
