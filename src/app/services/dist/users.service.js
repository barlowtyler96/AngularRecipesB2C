"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var environment_development_1 = require("src/environments/environment.development");
var core_1 = require("@angular/core");
var UsersService = /** @class */ (function () {
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.getUserFavoriteIds = function () {
        return this.http.get(environment_development_1.environment.apiBaseUrl + "Users/favoritesIds");
    };
    UsersService.prototype.getUserFavorites = function () {
        return this.http.get(environment_development_1.environment.apiBaseUrl + "Users/favorites");
    };
    UsersService.prototype.deleteUserFavorite = function (recipeId) {
        var url = environment_development_1.environment.apiBaseUrl + "Users/favorite/" + recipeId;
        return this.http["delete"](url);
    };
    UsersService.prototype.addUserFavorite = function (recipeId) {
        var url = environment_development_1.environment.apiBaseUrl + "Users/favorite/" + recipeId;
        return this.http.post(url, {});
    };
    UsersService.prototype.getUserCreatedRecipes = function () {
        return this.http.get(environment_development_1.environment.apiBaseUrl + "Users/myrecipes");
    };
    UsersService.prototype.upload = function (formData) {
        return this.http.post(environment_development_1.environment.apiBaseUrl + "Users/upload", formData);
    };
    UsersService.prototype.postSharedRecipe = function (recipeForm) {
        var recipe = recipeForm.value;
        return this.http.post(environment_development_1.environment.apiBaseUrl + "Users/share", recipe);
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
