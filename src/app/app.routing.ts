// app.routing.ts
// App Routing as a Module
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";

// Routes
const routes: Routes = [
  {
    path: "",
    component: RegisterComponent
  },
  { path: "lazy", loadChildren: "./lazy/lazy.module#LazyModule" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const rc = [RegisterComponent];
