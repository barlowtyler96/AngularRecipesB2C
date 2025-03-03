"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginationComponent = void 0;
var core_1 = require("@angular/core");
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.itemsPerPageOptions = [8, 16, 24, 32];
        this.currentPageNumber = 1;
        this.itemsPerPage = 8;
        this.pageChange = new core_1.EventEmitter();
        this.itemsPerPageChange = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.changePage = function (newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPageNumber = newPage;
            this.pageChange.emit(this.currentPageNumber);
        }
    };
    PaginationComponent.prototype.changeItemsPerPage = function () {
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.currentPageNumber = 1;
    };
    PaginationComponent.prototype.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "totalCount");
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "pageSize");
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "totalPages");
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "itemsPerPageOptions");
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "currentPageNumber");
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "itemsPerPage");
    __decorate([
        core_1.Output()
    ], PaginationComponent.prototype, "pageChange");
    __decorate([
        core_1.Output()
    ], PaginationComponent.prototype, "itemsPerPageChange");
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'app-pagination',
            templateUrl: './pagination.component.html',
            styleUrls: ['./pagination.component.css']
        })
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
