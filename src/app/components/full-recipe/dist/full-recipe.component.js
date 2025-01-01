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
var bootstrap_1 = require("bootstrap");
var FullRecipeComponent = /** @class */ (function () {
    function FullRecipeComponent() {
        this.ingredientArray1 = [];
        this.ingredientArray2 = [];
    }
    FullRecipeComponent.prototype.openModal = function () {
        if (!this.modal) {
            this.modal = new bootstrap_1.Modal(this.modalElement.nativeElement);
        }
        this.modal.show();
    };
    FullRecipeComponent.prototype.closeModal = function () {
        var _a;
        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.hide();
    };
    __decorate([
        core_1.Input()
    ], FullRecipeComponent.prototype, "fullRecipe");
    __decorate([
        core_1.Input()
    ], FullRecipeComponent.prototype, "ingredientArray1");
    __decorate([
        core_1.Input()
    ], FullRecipeComponent.prototype, "ingredientArray2");
    __decorate([
        core_1.ViewChild('modalElement')
    ], FullRecipeComponent.prototype, "modalElement");
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
