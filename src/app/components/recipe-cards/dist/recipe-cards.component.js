"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeCardsComponent = void 0;
var core_1 = require("@angular/core");
var msal_browser_1 = require("@azure/msal-browser");
var rxjs_1 = require("rxjs");
var full_recipe_component_1 = require("../full-recipe/full-recipe.component");
var RecipeCardsComponent = /** @class */ (function () {
    function RecipeCardsComponent(usersService, authService, msalBroadcastService) {
        this.usersService = usersService;
        this.authService = authService;
        this.msalBroadcastService = msalBroadcastService;
        this.userFavoriteIds = [];
        this.isSignedIn = false;
        this.ingredientArray1 = [];
        this.ingredientArray2 = [];
    }
    RecipeCardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.msalBroadcastService.msalSubject$
            .pipe(rxjs_1.filter(function (msg) { return msg.eventType === msal_browser_1.EventType.LOGIN_SUCCESS; }))
            .subscribe(function (result) {
            console.log(result);
        });
        this.msalBroadcastService.inProgress$
            .pipe(rxjs_1.filter(function (status) { return status === msal_browser_1.InteractionStatus.None; }))
            .subscribe(function () {
            _this.setSignedInStatus();
        });
        if (this.isSignedIn) {
            this.usersService.getUserFavoriteIds().subscribe({
                next: function (favoriteIds) {
                    _this.userFavoriteIds = favoriteIds;
                },
                error: function (error) {
                    console.error('Error fetching user favorite IDs:', error);
                }
            });
        }
    };
    RecipeCardsComponent.prototype.setSignedInStatus = function () {
        this.isSignedIn = this.authService.instance.getAllAccounts().length > 0;
    };
    RecipeCardsComponent.prototype.postUserFavorite = function (recipeId, isFavorite) {
        if (isFavorite) {
            this.usersService.deleteUserFavorite(recipeId).subscribe({});
            var index = this.userFavoriteIds.indexOf(recipeId);
            if (index !== -1) {
                this.userFavoriteIds.splice(index, 1);
            }
        }
        else if (!isFavorite) {
            this.usersService.addUserFavorite(recipeId).subscribe({});
            this.userFavoriteIds.push(recipeId);
        }
    };
    RecipeCardsComponent.prototype.openModal = function (recipe) {
        var _a;
        this.selectedRecipe = recipe;
        var midpoint = Math.ceil(recipe.ingredients.length / 2);
        this.ingredientArray1 = recipe.ingredients.slice(0, midpoint);
        this.ingredientArray2 = recipe.ingredients.slice(midpoint);
        (_a = this.modalComponent) === null || _a === void 0 ? void 0 : _a.openModal();
    };
    __decorate([
        core_1.Input()
    ], RecipeCardsComponent.prototype, "recipes");
    __decorate([
        core_1.ViewChild(full_recipe_component_1.FullRecipeComponent)
    ], RecipeCardsComponent.prototype, "modalComponent");
    RecipeCardsComponent = __decorate([
        core_1.Component({
            selector: 'app-recipe-cards',
            templateUrl: './recipe-cards.component.html',
            styleUrls: ['./recipe-cards.component.scss']
        })
    ], RecipeCardsComponent);
    return RecipeCardsComponent;
}());
exports.RecipeCardsComponent = RecipeCardsComponent;
