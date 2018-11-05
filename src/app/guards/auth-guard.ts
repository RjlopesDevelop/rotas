
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router

  ) {  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.verificarAcesso();
  }

  private verificarAcesso() {
    //  this.router.navigate(['/login']);

    return false;
 }

}
