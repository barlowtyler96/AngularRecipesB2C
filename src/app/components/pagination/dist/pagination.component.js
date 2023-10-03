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
        this.pageChange = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.goToPage = function (page) {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
            this.scrollToTop();
        }
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
    ], PaginationComponent.prototype, "currentPageNumber");
    __decorate([
        core_1.Input()
    ], PaginationComponent.prototype, "totalPages");
    __decorate([
        core_1.Output()
    ], PaginationComponent.prototype, "pageChange");
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
