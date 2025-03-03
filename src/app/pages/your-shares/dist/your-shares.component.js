"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.YourSharesComponent = void 0;
var core_1 = require("@angular/core");
var YourSharesComponent = /** @class */ (function () {
    function YourSharesComponent(usersService) {
        this.usersService = usersService;
        this.currentPage = 1;
        this.itemsPerPage = 8;
    }
    YourSharesComponent.prototype.ngOnInit = function () {
        this.loadData(1);
        this.headerTitle = "Your Shares";
    };
    YourSharesComponent.prototype.loadData = function (page) {
        this.recipePagination$ = this.usersService.getUserCreatedRecipes(this.currentPage, this.itemsPerPage);
    };
    YourSharesComponent.prototype.onItemsPerPageChange = function (newItemsPerPage) {
        this.itemsPerPage = newItemsPerPage;
        this.loadData(1);
    };
    YourSharesComponent = __decorate([
        core_1.Component({
            selector: 'app-your-shares',
            templateUrl: './your-shares.component.html',
            styleUrls: ['./your-shares.component.scss']
        })
    ], YourSharesComponent);
    return YourSharesComponent;
}());
exports.YourSharesComponent = YourSharesComponent;
