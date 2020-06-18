import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule, rc} from './app.routing'
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import {DemoMaterialModule} from './material-module';
@NgModule({
  imports:      [ BrowserModule, AppRoutingModule,DemoMaterialModule,FlexLayoutModule ],
  declarations: [ AppComponent, rc ],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
export class AppModule { }
