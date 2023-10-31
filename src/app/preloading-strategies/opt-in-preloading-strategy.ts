import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class OptInPreloadingStrategy implements PreloadingStrategy {

  /**
   *
   * @param route La ruta recibida que debería cargar un módulo
   * @param load La función que carga el módulo
   * @returns ejecuta el callback de carga del módulo o devuelve un Observable vacío
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload'] ? load() : of(null);
  }
}

