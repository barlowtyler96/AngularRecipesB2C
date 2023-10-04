"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
// Import MSAL and MSAL browser libraries. 
var msal_angular_1 = require("@azure/msal-angular");
var msal_browser_1 = require("@azure/msal-browser");
// Import the Azure AD B2C configuration 
var auth_config_1 = require("./auth-config");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var home_component_1 = require("./pages/home/home.component");
var browse_component_1 = require("./pages/browse/browse.component");
var share_component_1 = require("./pages/share/share.component");
var your_shares_component_1 = require("./pages/your-shares/your-shares.component");
var favorites_component_1 = require("./pages/favorites/favorites.component");
var pagination_component_1 = require("./components/pagination/pagination.component");
var recipe_cards_component_1 = require("./components/recipe-cards/recipe-cards.component");
var truncate_pipe_1 = require("./pipes/truncate.pipe");
var forms_1 = require("@angular/forms");
var search_bar_component_1 = require("./search-bar/search-bar.component");
var full_recipe_component_1 = require("./components/full-recipe/full-recipe.component");
var animations_1 = require("@angular/platform-browser/animations");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                sidebar_component_1.SidebarComponent,
                navbar_component_1.NavbarComponent,
                home_component_1.HomeComponent,
                browse_component_1.BrowseComponent,
                share_component_1.ShareComponent,
                your_shares_component_1.YourSharesComponent,
                favorites_component_1.FavoritesComponent,
                pagination_component_1.PaginationComponent,
                recipe_cards_component_1.RecipeCardsComponent,
                truncate_pipe_1.TruncatePipe,
                search_bar_component_1.SearchBarComponent,
                full_recipe_component_1.FullRecipeComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                msal_angular_1.MsalModule.forRoot(new msal_browser_1.PublicClientApplication(auth_config_1.msalConfig), {
                    // The routing guard configuration. 
                    interactionType: msal_browser_1.InteractionType.Redirect,
                    authRequest: {
                        scopes: auth_config_1.protectedResources.culinarySharesApi.scopes
                    }
                }, {
                    // MSAL interceptor configuration.
                    // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
                    interactionType: msal_browser_1.InteractionType.Redirect,
                    protectedResourceMap: new Map([
                        [auth_config_1.protectedResources.culinarySharesApi.endpoint, auth_config_1.protectedResources.culinarySharesApi.scopes]
                    ])
                })
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: msal_angular_1.MsalInterceptor,
                    multi: true
                },
                msal_angular_1.MsalGuard
            ],
            bootstrap: [
                app_component_1.AppComponent,
                msal_angular_1.MsalRedirectComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
