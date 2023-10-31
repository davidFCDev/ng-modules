import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OptInPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
      data: {
        preload: true
      }
  },
  // Siempre el 404 va en el modulo principal
  {
    path: '**',
    loadChildren: () =>
      import('./modules/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // * 1 - Precargar todos los módulos de las rutas
    // preloadingStrategy: PreloadAllModules
    // * 2 - No precargar ningún módulo de las rutas
    // preloadingStrategy: NoPreloading
    // * 3 - Estrategia personalizada de precarga por opciones en rutas
    // preloadingStrategy: OptInPreloadingStrategy
    // * 4 - Estrategia personalizada de precarga por conexión
    preloadingStrategy: NetworkAwarePreloadStrategy
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
