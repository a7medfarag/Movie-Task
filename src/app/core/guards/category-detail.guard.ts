import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailGuard implements CanActivate {
  constructor(private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id =Number(route.paramMap.get('id'));
      if(isNaN(id) || id < 1){
        alert('Invalid Movie ID');
        this._router.navigate(['/category-list']);
        return false;
      }
    return true;
  }
  
}
