import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule, rc } from "./app.routing";
import { AppComponent } from "./app.component";
import { DataService } from "./data.service";
import { DemoMaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, rc],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {}
