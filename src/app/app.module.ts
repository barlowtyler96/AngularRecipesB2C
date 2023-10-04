import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

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
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FullRecipeComponent } from './components/full-recipe/full-recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
