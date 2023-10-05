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
var RecipeCardsComponent = /** @class */ (function () {
    function RecipeCardsComponent(usersService, authService, msalBroadcastService) {
        this.usersService = usersService;
        this.authService = authService;
        this.msalBroadcastService = msalBroadcastService;
        this.userFavoriteIds = [];
        this.isSignedIn = false;
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
    RecipeCardsComponent.prototype.showFullRecipe = function (recipeId) {
        this.selectedRecipeId = recipeId;
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
    __decorate([
        core_1.Input()
    ], RecipeCardsComponent.prototype, "recipes");
    __decorate([
        core_1.Input()
    ], RecipeCardsComponent.prototype, "recipe");
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
