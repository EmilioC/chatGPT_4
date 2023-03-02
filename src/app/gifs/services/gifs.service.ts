import { Injectable } from '@angular/core';

@Injectable({
  /*   root indica que estará disponible a nivel global */
  providedIn: 'root'
})
export class GifsService {


  private _historial: string[] = [];

  get historial() {
    /*     los tres puntos indica que es una referencia por lo que 
        si hay una modificación no afectamos al original _historial [] */
    return [...this._historial];
  }
  /* Insertamos valores al historial */
  buscarGifs(query: string) {
    /*   Insertamos el nuevo string al principio con .unshift */
    this._historial.unshift(query);
    console.log("***DESDE GIFSSERVICE***",this._historial);
  }




  constructor() { }
}
