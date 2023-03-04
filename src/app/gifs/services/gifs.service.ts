import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  /*   root indica que estará disponible a nivel global */
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = "N8segJHx4XezJ8U2f0Ma13fPMQIDoIA6";
  private _historial: string[] = [];
//TODO; Cambiar any por su tipo 
  public resultados: any[] = [];

  constructor(private http: HttpClient) { }

  get historial() {
    /*  La sintaxis [...this._historial] indica que se debe 
    crear un nuevo arreglo que contenga los mismos elementos que _historial,
     es decir, una copia del arreglo original. Esto se hace para evitar que se
      modifique el arreglo original al que se hace referencia desde otras
       partes del código.*/
    return [...this._historial];
  }
  /* Insertamos valores al historial
  método buscarGifs() recibe una cadena de texto query como argumento, que tiene un 
  valor predeterminado vacío en caso de que no se proporcione ningún valor. */
  buscarGifs(query: string = '') {

    /*     el método trim() a query para eliminar los espacios 
        en blanco al inicio y al final de la cadena. Luego, 
        se convierte query a minúsculas mediante el método toLocaleLowerCase(). */
    query = query.trim().toLocaleLowerCase();
    /*     En este fragmento de código, se utiliza el método includes() para verificar 
        si la consulta query ya existe en el historial de búsquedas _historial.
         Si la consulta no existe en el historial, se agrega al principio del historial 
         utilizando el método unshift(). Si la consulta ya existe en el historial, no se agrega nada. */
    if (!this._historial.includes(query)) {
      /*   Insertamos el nuevo string al principio con .unshift */
      this._historial.unshift(query);
      /* En este caso, el método splice() se utiliza para eliminar todos los elementos del arreglo _historial 
a partir del índice 0, excepto los primeros 10 elementos. Esto significa que si _historial tiene más de 10 elementos, 
se eliminarán todos los elementos después del décimo elemento y solo se conservarán los primeros 10 elementos */
      this._historial = this._historial.splice(0, 10);
    }

/*     símbolo ` (acento grave) en lugar de comillas. Los template literals permiten 
    la interpolación de variables y expresiones dentro de una cadena de texto 
    utilizando la sintaxis ${} y se pueden utilizar para formatear cadenas de texto
     más complejas de manera más fácil y legible. */
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=N8segJHx4XezJ8U2f0Ma13fPMQIDoIA6&q=${ query }&limit=10`)
    .subscribe( (resp: any)  =>{
      console.log( resp.data);
      this.resultados = resp.data;
    })

    console.log("***DESDE GIFSSERVICE***", this._historial);
  }



}
/*     método de JavaScript que se utiliza para realizar solicitudes 
    HTTP a servidores web y obtener recursos de la red. 
    fetch('https://api.giphy.com/v1/gifs/search?api_key=N8segJHx4XezJ8U2f0Ma13fPMQIDoIA6&q=developer&limit=10')
    .then( resp => {
      resp.json().then(data => {
        console.log(data)
      })
    }) */