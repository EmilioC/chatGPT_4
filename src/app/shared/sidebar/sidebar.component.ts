import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `li{ cursor: pointer;}`
  ]
})
export class SidebarComponent {

  get  historial () {
   return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  buscar( termino: string){
    console.log(termino)
    this.gifsService.buscarGifs( termino)
  }

}
