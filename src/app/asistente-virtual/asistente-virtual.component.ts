import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistente-virtual',
  templateUrl: './asistente-virtual.component.html',
  styleUrls: ['./asistente-virtual.component.css']
})
export class AsistenteVirtualComponent implements OnInit {
    texto = '';
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    escuchar(): void {
      const reconocimiento = new (window as any).webkitSpeechRecognition();
      reconocimiento.lang = 'es-ES';
      reconocimiento.onresult = (event: any) => {
        this.texto = event.results[0][0].transcript;
      };
      reconocimiento.start();
    }
  
    hablar(): void {
      const sintesis = window.speechSynthesis;
      const mensaje = new 
      SpeechSynthesisUtterance(this.texto);
      mensaje.lang = 'es-ES';
      sintesis.speak(mensaje);
    }

}
