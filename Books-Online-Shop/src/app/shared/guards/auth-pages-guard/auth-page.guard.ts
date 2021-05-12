import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPageGuard implements CanActivate {
  constructor(private _firebaseAuthService:FirebaseAuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._firebaseAuthService.userIsInactive();
  }
  
}
