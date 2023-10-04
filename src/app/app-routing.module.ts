import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { ShareComponent } from './pages/share/share.component';
import { YourSharesComponent } from './pages/your-shares/your-shares.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: { animation: 'isFirst' } },
  {path: 'browse', component: BrowseComponent, data: { animation: 'isSecond' } },
  {path: 'share', component: ShareComponent, data: { animation: 'isThird' }, 
  canActivate: [MsalGuard] },
  {path: 'yourShares', component: YourSharesComponent, data: { animation: 'isFourth' }, 
  canActivate: [MsalGuard]},
  {path: 'favorites', component: FavoritesComponent, data: { animation: 'isFifth' }, 
  canActivate: [MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation:'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
