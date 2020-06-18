// app.routing.ts
// App Routing as a Module
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChildOneComponent } from "./child-one/child-one.component";

// Routes
const routes: Routes = [
  { path: "one", component: ChildOneComponent },
  { path: "lazy", loadChildren: "./lazy/lazy.module#LazyModule" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const rc = [ChildOneComponent];
