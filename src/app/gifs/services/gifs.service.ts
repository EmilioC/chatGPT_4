import { Injectable } from '@angular/core';

@Injectable({
  /*   root indica que estará disponible a nivel global */
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    /* En este caso, el método splice() se utiliza para eliminar todos los elementos del arreglo _historial 
    a partir del índice 0, excepto los primeros 10 elementos. Esto significa que si _historial tiene más de 10 elementos, 
    se eliminarán todos los elementos después del décimo elemento y solo se conservarán los primeros 10 elementos */
    this._historial = this._historial.splice(0, 10);

    /*  Los tres puntos indica que es una referencia, por lo que 
        si hay una modificación no afectamos al original _historial [] */
    return [...this._historial];
  }
  /* Insertamos valores al historial */
  buscarGifs(query: string) {
    /*   Insertamos el nuevo string al principio con .unshift */
    this._historial.unshift(query);
    console.log("***DESDE GIFSSERVICE***", this._historial);
  }




  constructor() { }
}
