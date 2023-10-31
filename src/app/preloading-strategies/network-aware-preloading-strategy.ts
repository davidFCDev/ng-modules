import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

// avoid typing issues for now
export declare var navigator: any;

@Injectable({
  providedIn: 'root',
})

export class NetworkAwarePreloadStrategy implements PreloadingStrategy {

  /**
   *
   * @param route La ruta recibida que debería cargar un módulo
   * @param load La función que carga el módulo
   * @returns ejecuta el callback de carga del módulo o devuelve un Observable vacío
   */

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Comprueba que el usuario tiene una buena conexión
    // * 1 En caso de que devuelva true, carga el módulo
    // * 2 En caso de que devuelva false, devuelve un Observable vacío
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  hasGoodConnection(): boolean {
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];
      const effectiveType = conn.effectiveType || '';
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }
    return true;
  }
}
