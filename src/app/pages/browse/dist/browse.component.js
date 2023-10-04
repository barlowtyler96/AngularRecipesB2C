"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BrowseComponent = void 0;
var core_1 = require("@angular/core");
var BrowseComponent = /** @class */ (function () {
    function BrowseComponent(recipesService) {
        this.recipesService = recipesService;
        this.searchText = '';
    }
    BrowseComponent.prototype.onSearch = function (searchText) {
        this.searchText = searchText;
        this.loadData(1);
    };
    BrowseComponent.prototype.loadData = function (page) {
        this.recipePagination$ = this.recipesService.getRecipePaginationByKeyword(this.searchText, page, 8);
    };
    BrowseComponent = __decorate([
        core_1.Component({
            selector: 'app-browse',
            templateUrl: './browse.component.html',
            styleUrls: ['./browse.component.scss']
        })
    ], BrowseComponent);
    return BrowseComponent;
}());
exports.BrowseComponent = BrowseComponent;