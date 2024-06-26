import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanDeactivate,
  CanDeactivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: "root",
// })

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate (
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

// export const CanDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
//   component: CanComponentDeactivate
// ): Observable<boolean> | Promise<boolean> | boolean => {
//   return component.canDeactivate()? component.canDeactivate(): true;
// }
