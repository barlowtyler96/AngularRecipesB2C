"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoritesComponent = void 0;
var core_1 = require("@angular/core");
var FavoritesComponent = /** @class */ (function () {
    function FavoritesComponent(usersService) {
        this.usersService = usersService;
        this.currentPage = 1;
        this.itemsPerPage = 8;
    }
    FavoritesComponent.prototype.ngOnInit = function () {
        this.loadData(this.currentPage);
        this.headerTitle = "Favorites";
    };
    FavoritesComponent.prototype.loadData = function (page) {
        this.recipePagination$ = this.usersService.getUserFavorites(page, this.itemsPerPage);
    };
    FavoritesComponent.prototype.onItemsPerPageChange = function (newItemsPerPage) {
        this.itemsPerPage = newItemsPerPage;
        this.loadData(1);
    };
    FavoritesComponent = __decorate([
        core_1.Component({
            selector: 'app-favorites',
            templateUrl: './favorites.component.html',
            styleUrls: ['./favorites.component.scss']
        })
    ], FavoritesComponent);
    return FavoritesComponent;
}());
exports.FavoritesComponent = FavoritesComponent;
