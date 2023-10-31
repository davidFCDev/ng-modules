import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class PreloadingOptions {

  constructor(
    public routePath: string,
    public preload: boolean = true
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class PreloadingService {

  private _subject = new Subject<PreloadingOptions>();

  public options$ = this._subject.asObservable();

  constructor() { }

  comenzarPrecarga(routePath: string) {
    // Creamos unas opciones de precarga
    const opcionesPrecarga = new PreloadingOptions(routePath, true);

    // Enviamos las opciones de precarga
    // Esta infomración la recibe el interceptor
    // * ON-DEMAND PRELOADING STRATEGY
    this._subject.next(opcionesPrecarga);
  }
}
