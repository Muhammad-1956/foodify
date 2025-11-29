import { CanActivate, Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  // private userToken = localStorage.getItem('userToken');
  // canActivate(): boolean {
  //   return true;
  // }

  canActivate():boolean{
  if(localStorage.getItem('userToken') != null) {
      return true
  }else {
  this.router.navigate(['/auth/login'])
  return false
}
}
}
