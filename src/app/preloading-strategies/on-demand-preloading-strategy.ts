import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PreloadingOptions, PreloadingService } from '../services/preloading.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OnDemandPreloadingStrategy implements PreloadingStrategy {

  private _preloadDemandOptions: Observable<PreloadingOptions>

  constructor(private _preloadingService: PreloadingService) {}

  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data['preload'] ? load() : of(null);
  }
}
