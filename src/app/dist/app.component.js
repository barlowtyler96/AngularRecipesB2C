"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var route_animations_1 = require("./route-animations");
var rxjs_1 = require("rxjs");
var msal_browser_1 = require("@azure/msal-browser");
var AppComponent = /** @class */ (function () {
    function AppComponent(broadcastService, authService) {
        this.broadcastService = broadcastService;
        this.authService = authService;
        this.title = 'AngularRecipesB2C';
        this.loginDisplay = false;
        this._destroying$ = new rxjs_1.Subject();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.broadcastService.inProgress$
            .pipe(rxjs_1.filter(function (status) { return status === msal_browser_1.InteractionStatus.None; }), rxjs_1.takeUntil(this._destroying$))
            .subscribe(function () {
            _this.setLoginDisplay();
        });
    };
    AppComponent.prototype.setLoginDisplay = function () {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    };
    AppComponent.prototype.prepareRoute = function (outlet) {
        return outlet && outlet.activatedRouteData['animation'];
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            animations: [
                route_animations_1.fader
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
