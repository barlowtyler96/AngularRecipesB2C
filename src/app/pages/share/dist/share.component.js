"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareComponent = void 0;
var core_1 = require("@angular/core");
var ShareComponent = /** @class */ (function () {
    function ShareComponent(usersService, recipesService) {
        this.usersService = usersService;
        this.recipesService = recipesService;
        this.filename = '';
        this.recipe = {
            recipeId: 0,
            name: '',
            description: '',
            instructions: '',
            imageUrl: '',
            recipeIngredients: []
        };
    }
    ShareComponent.prototype.setFilename = function (files) {
        if (files[0]) {
            // Generate a unique filename using a timestamp and a random string
            var timestamp = new Date().getTime();
            var randomString = Math.random().toString(36).substring(7);
            this.filename = timestamp + "_" + randomString + "_" + files[0].name;
        }
    };
    ShareComponent.prototype.onSubmit = function (files) {
        var _this = this;
        var formData = new FormData();
        if (files[0]) {
            // Use the generated unique filename when appending to FormData
            formData.append(this.filename, files[0]);
        }
        this.usersService
            .upload(formData)
            .subscribe(function (_a) {
            var path = _a.path;
            _this.recipe.imageUrl = path;
            _this.usersService.postSharedRecipe(_this.recipe).subscribe(function (recipeId) {
                _this.createdRecipeId = recipeId;
            });
            _this.createdRecipes$ = _this.recipesService.getRecipePagination(1, 8);
        });
    };
    ShareComponent.prototype.addIngredient = function () {
        this.recipe.recipeIngredients.push({
            recipeId: 0,
            ingredientId: 0,
            amount: 0,
            unit: '',
            ingredientName: ''
        });
    };
    ShareComponent.prototype.removeIngredient = function (index) {
        this.recipe.recipeIngredients.splice(index, 1);
    };
    ShareComponent = __decorate([
        core_1.Component({
            selector: 'app-share',
            templateUrl: './share.component.html',
            styleUrls: ['./share.component.scss']
        })
    ], ShareComponent);
    return ShareComponent;
}());
exports.ShareComponent = ShareComponent;
