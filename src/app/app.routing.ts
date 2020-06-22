// app.routing.ts
// App Routing as a Module
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {Role} from "./models/role"
import { AuthGuard } from './guards/auth.guard';
// Routes
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  { path: "admin", loadChildren: "./lazy/lazy.module#LazyModule",
   data: { roles: [Role.Admin] }, canActivate: [AuthGuard], },
 
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const rc = [RegisterComponent,LoginComponent,HomeComponent];
