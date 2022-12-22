import { NgModule } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Health } from '@awesome-cordova-plugins/health/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  
  ],
  providers: [Health],
  bootstrap: [AppComponent]
})
export class AppModule { }
