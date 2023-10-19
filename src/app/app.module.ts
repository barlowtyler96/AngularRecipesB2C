import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import MSAL and MSAL browser libraries. 
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

// Import the Azure AD B2C configuration 
import { msalConfig, protectedResources } from './auth-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { ShareComponent } from './pages/share/share.component';
import { YourSharesComponent } from './pages/your-shares/your-shares.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RecipeCardsComponent } from './components/recipe-cards/recipe-cards.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FullRecipeComponent } from './components/full-recipe/full-recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BrowseComponent,
    ShareComponent,
    YourSharesComponent,
    FavoritesComponent,
    PaginationComponent,
    RecipeCardsComponent,
    TruncatePipe,
    SearchBarComponent,
    FullRecipeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration. 
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.culinarySharesApi.scopes
        }
      },
      {
        // The protected resource mapping maps the web API with the corresponding app scopes.
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [protectedResources.culinarySharesApi.endpoint, protectedResources.culinarySharesApi.scopes]
        ])
      })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [
    AppComponent,
    MsalRedirectComponent
  ]
})
export class AppModule { }
