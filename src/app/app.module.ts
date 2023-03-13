import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';
import { CustomerSupportComponent } from './customer-support/customer-support.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerSupportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    GifsModule,
    CommonModule
  ],
  exports:[
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
