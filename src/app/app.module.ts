import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule, rc } from "./app.routing";
import { AppComponent } from "./app.component";
import { RegisterProvider} from "./provider/register";
import { DemoMaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [AppComponent, rc],
  bootstrap: [AppComponent],
  providers: [RegisterProvider]
})
export class AppModule {}
