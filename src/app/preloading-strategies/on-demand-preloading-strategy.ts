import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY, mergeMap } from 'rxjs';
import {
  PreloadingOptions,
  PreloadingService,
} from '../services/preloading.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnDemandPreloadingStrategy implements PreloadingStrategy {
  private _preloadDemandOptions$: Observable<PreloadingOptions>;

  constructor(private _preloadingService: PreloadingService) {
    // Inicializamos las opciones desde el Observable del servicio
    this._preloadDemandOptions$ = this._preloadingService.options$;
  }

  private decidirSiCargar(
    route: Route,
    preloadingOptions: PreloadingOptions
  ): boolean {
    // Si la ruta tiene la propiedad preload y es true
    // o si la ruta no tiene la propiedad preload
    // y las opciones de precarga son true
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadingOptions.routePath) &&
      preloadingOptions.preload
    );
  }

  preload(route: Route, load: Function): Observable<any> {
    this._preloadDemandOptions$.pipe(
      mergeMap((preloadingOptions: PreloadingOptions) => {
        const precargar: boolean = this.decidirSiCargar(
          route,
          preloadingOptions
        );
        console.log(`Precarga bajo demanda de ${route.path} es: ${precargar}`);
        return precargar ? load() : EMPTY;
      })
    );

    return route.data && route.data['preload'] ? load() : EMPTY;
  }
}
