"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(recipesService) {
        this.recipesService = recipesService;
        this.currentPage = 1;
        this.itemsPerPage = 8;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadData(this.currentPage);
        this.headerTitle = "Recently Shared";
    };
    HomeComponent.prototype.loadData = function (page) {
        this.currentPage = page;
        this.recipePagination$ = this.recipesService.getRecentRecipePagination(page, this.itemsPerPage);
    };
    HomeComponent.prototype.onItemsPerPageChange = function (newItemsPerPage) {
        this.itemsPerPage = newItemsPerPage;
        this.loadData(1);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
