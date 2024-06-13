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

// export class canDeactivateGuard implements CanDeactivate<any> {
//   canDeactivate(
//     component: any,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState: RouterStateSnapshot
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return component.canDeactivate();
//   }
// }

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Component', component);
    return component.canDeactivate ? component.canDeactivate(): true;
  }
}

// export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
//   component: CanComponentDeactivate
// ): Observable<boolean> | Promise<boolean> | boolean => {
//   return component.deactivate? component.deactivate(): true;
// };
