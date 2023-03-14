import { Component, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from '../environments/environment';
import { gptModels } from '../models/constants';
import { ChatWithBot, ResponseModel } from '../models/gpt-response';
import { frasesChiquito } from '../../assets/data/arrayFrasesChiquito';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html'
})
export class CustomerSupportComponent implements OnInit {
chatConversation: ChatWithBot[]=[];
response!: ResponseModel | undefined;
    gptModels = gptModels
    promptText = '';
    arrayFrasesChiquito = frasesChiquito;
    promptTextModificado = 'responde gracioso, añadiendo durante tu respuesta varias convinaciones de la siguiente frase:'
    showSpinner = false;

  constructor() { }

  ngOnInit(): void {
  }

  fraseAleatoria(array: string[]) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
  }

  checkResponse() {
    this.pushChatContent(this.promptText,'You','person');
    this.invokeGPT();
  }

  pushChatContent(content:string, person:string, cssClass:string) {
    const chatToPush: ChatWithBot = { person:person, response:content, cssClass:cssClass};
    this.chatConversation.unshift(chatToPush);
  }


  getText(data:string) {
    console.log(data);
    return data.split('\n').filter(f=>f.length>0);
    
  }

  async invokeGPT() {
   

    if(this.promptText.length<2)
    return;
    try{
      this.response = undefined;
      let configuration = new Configuration({apiKey: environment.apiKey});
      let openai = new OpenAIApi(configuration);

      let requestData={
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
      
    this.promptText = '';

      this.showSpinner = false;
    }catch(error:any) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
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
}
