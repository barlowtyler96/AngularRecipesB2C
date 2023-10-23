"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var msal_angular_1 = require("@azure/msal-angular");
var auth_config_1 = require("src/app/auth-config");
var environment_1 = require("src/environments/environment");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(msalGuardConfig, authService) {
        this.msalGuardConfig = msalGuardConfig;
        this.authService = authService;
        this.isSidebarExpanded = false;
        this.loginDisplay = false;
    }
    SidebarComponent.prototype.toggleSidebar = function () {
        this.isSidebarExpanded = !this.isSidebarExpanded;
    };
    SidebarComponent.prototype.login = function () {
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect(__assign({}, this.msalGuardConfig.authRequest));
        }
        else {
            this.authService.loginRedirect();
        }
    };
    SidebarComponent.prototype.logout = function () {
        this.authService.logoutRedirect({
            postLogoutRedirectUri: "" + environment_1.environment.logoutRedirectUrl
        });
    };
    SidebarComponent.prototype.editProfile = function () {
        var authority = auth_config_1.b2cPolicies.authorities.editProfile.authority;
        var editProfileRequest = {
            authority: authority
        };
        if (this.msalGuardConfig.authRequest) {
            this.authService.acquireTokenRedirect(editProfileRequest);
        }
        else {
            this.authService.loginRedirect();
        }
    };
    __decorate([
        core_1.Input()
    ], SidebarComponent.prototype, "loginDisplay");
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        }),
        __param(0, core_1.Inject(msal_angular_1.MSAL_GUARD_CONFIG))
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
