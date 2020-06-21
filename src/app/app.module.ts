import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule, rc } from "./app.routing";
import { AppComponent } from "./app.component";
import { RegisterService} from "./provider/register.service";
import { DemoMaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor'
import {ErrorInterceptor} from './helpers/error.interceptor'

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
  providers: [
  RegisterService,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppModule {}
