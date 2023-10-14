"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FullRecipeComponent = void 0;
var core_1 = require("@angular/core");
var FullRecipeComponent = /** @class */ (function () {
    function FullRecipeComponent(recipesService) {
        this.recipesService = recipesService;
    }
    FullRecipeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipesService.getFullRecipeById(this.recipeId)
            .subscribe(function (data) {
            _this.fullRecipe = data;
            var recipeElement = document.getElementById("fullRecipe");
            setTimeout(function () {
                var recipeElement = document.getElementById("fullRecipe");
                if (recipeElement) {
                    recipeElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 150);
        });
    };
    __decorate([
        core_1.Input()
    ], FullRecipeComponent.prototype, "recipeId");
    FullRecipeComponent = __decorate([
        core_1.Component({
            selector: 'app-full-recipe',
            templateUrl: './full-recipe.component.html',
            styleUrls: ['./full-recipe.component.scss']
        })
    ], FullRecipeComponent);
    return FullRecipeComponent;
}());
exports.FullRecipeComponent = FullRecipeComponent;
