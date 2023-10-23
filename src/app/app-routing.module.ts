import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { ShareComponent } from './pages/share/share.component';
import { YourSharesComponent } from './pages/your-shares/your-shares.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    title: "Home",
    data: { animation: 'homePage' }
  },
  {
    path: 'browse', component: BrowseComponent,
    title: "Browse",
    data: { animation: 'browsePage' }
  },
  {
    path: 'share', component: ShareComponent,
    title: "Share a Recipe",
    data: { animation: 'sharePage' },
    canActivate: [MsalGuard]
  },
  {
    path: 'yourShares', component: YourSharesComponent,
    title: "Your Shares",
    data: { animation: 'youSharesPage' },
    canActivate: [MsalGuard]
  },
  {
    path: 'favorites', component: FavoritesComponent,
    title: "Your Favorites",
    data: { animation: 'favoritesPage' },
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
