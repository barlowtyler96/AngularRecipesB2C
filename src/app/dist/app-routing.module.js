"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./pages/home/home.component");
var browse_component_1 = require("./pages/browse/browse.component");
var share_component_1 = require("./pages/share/share.component");
var your_shares_component_1 = require("./pages/your-shares/your-shares.component");
var favorites_component_1 = require("./pages/favorites/favorites.component");
var msal_angular_1 = require("@azure/msal-angular");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: home_component_1.HomeComponent,
        title: "Home",
        data: { animation: 'homePage' }
    },
    {
        path: 'browse', component: browse_component_1.BrowseComponent,
        title: "Browse",
        data: { animation: 'browsePage' }
    },
    {
        path: 'share', component: share_component_1.ShareComponent,
        title: "Share a Recipe",
        data: { animation: 'sharePage' },
        canActivate: [msal_angular_1.MsalGuard]
    },
    {
        path: 'yourShares', component: your_shares_component_1.YourSharesComponent,
        title: "Your Shares",
        data: { animation: 'youSharesPage' },
        canActivate: [msal_angular_1.MsalGuard]
    },
    {
        path: 'favorites', component: favorites_component_1.FavoritesComponent,
        title: "Your Favorites",
        data: { animation: 'favoritesPage' },
        canActivate: [msal_angular_1.MsalGuard]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, {
                    initialNavigation: 'enabledBlocking'
                })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
