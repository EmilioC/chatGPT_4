import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  /*   ViewClild busca cualquier elemento del DOM y podemos
    manejarlo 
    El símbolo ! indica que not null accesion operator
    es un operador para asegurarse que el objeto no es nulo
    Al tipar textBuscar como HTMLInputElement tenemos acceso al .value*/
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  /*   Insertamos el servicio para poder añadir el elemento al array
    el value */
  constructor(private gifsService: GifsService) { }


  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    /* Insertamos el valor en el método a través del servicio */
    this.gifsService.buscarGifs(valor);
    /*   Limpiamos el input  */
    this.txtBuscar.nativeElement.value = '';
  }

}
