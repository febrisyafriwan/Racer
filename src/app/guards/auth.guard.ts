import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthenticationService } from "../providers/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      if (route.data.roles && currentUser.role.length > 0) {
        for (let i = 0; i < currentUser.role.length; i++) {
          if (route.data.roles.indexOf(currentUser.role[i]) != -1) {
            return true;
          }
        }
      } else {
        this.router.navigate(["/"]);
        return false;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
