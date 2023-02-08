import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './auth/authguard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'places/tabs',
    pathMatch: 'full'
  },
  {
    path: 'recipess',
    children:[
      {
        path: '',
        loadChildren: () => import('./recipess/recipess.module').then( m => m.RecipessPageModule)
      },
      {
        path: ':recipeid',
        loadChildren: () => import('./recipess/recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule)

      },
    ]
  },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then( m => m.PlacesPageModule ),
    canLoad:[AuthguardGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule),
    canLoad:[AuthguardGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
