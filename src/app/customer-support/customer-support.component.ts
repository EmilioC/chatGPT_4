import { Component, OnInit } from '@angular/core';
import { Configuration, OpenAIApi, } from 'openai';
import { environment } from '../environments/environment';
import { gptModels } from '../models/constants';
import { ChatWithBot, ResponseModel, ResponseModelTurbo, message } from '../models/gpt-response';
import { frasesChiquito_1 } from '../../assets/data/arrayFrasesChiquito_1';
import { User } from '../gifs/interfaces/gifs.interface';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html'
})
export class CustomerSupportComponent implements OnInit {

  chatConversation: ChatWithBot[] = [];
  response!: ResponseModel | undefined;
  responseTurbo!: any;
  gptModels = gptModels;
  promptText = '';
  roleSystem: string = 'system';
  roleUser: string = 'user'
  arrayFrasesChiquito = frasesChiquito_1;
  promptTextModificado = ', responde con mucho humor, añade a tu respuesta, combinaciones de las palabras de la siguiente frase:'
  showSpinner = false;
  messages: string[] = [];
  temperature: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  fraseAleatoria(array: string[]) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
  }

  checkResponse() {
    this.pushChatContent(this.promptText, 'Fistro pecador', 'person');
    this.invokeGPT();
    this.promptText = '';
  }

  pushChatContent(content: string, person: string, cssClass: string) {
    const chatToPush: ChatWithBot = { person: person, response: content, cssClass: cssClass };
    this.chatConversation.unshift(chatToPush);
  }

  /* INICIO MODIFICADO PARA gpt-3.5-turbo */

  pushChatContentTurbo(content: string, person: any, cssClass: string) {
    const chatToPush = { response: content, person: person, cssClass: cssClass };
    this.chatConversation.unshift(chatToPush);
  }

  checkResponseTurbo() {
    this.pushChatContentTurbo(this.promptText, 'Fistro pecador', 'person');
    this.invokeGPT();
    this.promptText = '';
  }
  /*  FIN MODIFICADO PARA gpt-3.5-turbo */

  getText(data: string) {
    console.log(data);
    return data.split('\n').filter(f => f.length > 0);

  }

  async invokeGPT() {


    if (this.promptText.length < 2)
      return;
    try {
      this.response = undefined;
      let configuration = new Configuration({ apiKey: environment.apiKey });
      let openai = new OpenAIApi(configuration);

      /*       let requestData={
              model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
              prompt: this.promptTextModificado + this.fraseAleatoria(frasesChiquito) + this.promptText,//this.generatePrompt(animal),
              temperature: 0.95,
              max_tokens: 100,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            };
      
                  this.showSpinner = true;
            let apiResponse =  await openai.createCompletion(requestData);
      
            this.response = apiResponse.data as ResponseModel;
            this.pushChatContent(this.response.choices[0].text.trim(),'ChiquiTronic','bot'); 
       */
      /* INICIO MODIFICADO PARA gpt-3.5-turbo */
      this.showSpinner = true;
      let apiResponse = await openai.createChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { 'role': 'system', content: "eres un humorista" },
            { 'role': 'user', content:this.promptText + this.promptTextModificado + this.fraseAleatoria(frasesChiquito_1) }
          ]
          ,
          temperature: 1
        }
      )

      this.response = apiResponse.data as ResponseModel;
      console.log(this.responseTurbo);
      this.responseTurbo = this.response.choices;

      console.log(this.responseTurbo[0].message.content);
      this.pushChatContentTurbo(this.responseTurbo[0].message.content, 'ChiquiTronic', 'bot');
      /* FIN MODIFICADO PARA gpt-3.5-turbo */
this.hablar(this.responseTurbo[0].message.content);
      this.showSpinner = false;

    } catch (error: any) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        this.pushChatContent("Madre mía ¡¡ los cien caballos de bonanza se me han escapao ¡¡", 'ChiquiTronic', 'bot');

      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);

      }
    }
  }

  rabbitState: string = '';

  startAnimation() {
    this.rabbitState = 'running';
    setTimeout(() => {
      this.rabbitState = 'love';
      setTimeout(() => {
        this.rabbitState = '';
      }, 500);
    }, 2000);
  }

  hablar( texto: string): void {
    const sintesis = window.speechSynthesis;
    const mensaje = new 
    SpeechSynthesisUtterance(texto);
    mensaje.lang = 'es-ES';
    sintesis.speak(mensaje);
  }

}
