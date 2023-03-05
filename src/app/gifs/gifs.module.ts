import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { ResultadosGPTComponent } from './resultados-gpt/resultados-gpt.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent,
    ResultadosComponent,
    ResultadosGPTComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    GifsPageComponent,
  ]
})
export class GifsModule { }
