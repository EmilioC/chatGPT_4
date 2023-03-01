import { Component, ElementRef, ViewChild } from '@angular/core';

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
  @ViewChild( 'txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar( ){
    const valor = this.txtBuscar.nativeElement.value;
    console.log(this.txtBuscar)
    this.txtBuscar.nativeElement.value='';
  }

}
