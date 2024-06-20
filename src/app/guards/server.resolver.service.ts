import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { IServer } from '../models/server.model';
import { Observable } from 'rxjs';
import { ServersService } from '../servers/servers.service';

@Injectable({
  providedIn: "root"
})

// export const PostResolver: ResolveFn<IServer> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
//   serverService: ServersService = inject(ServersService)): Observable<IServer> | Promise<IServer> | IServer => {
//   return serverService.getServerById(+ route.params['id']);
// }

export class serverResolver implements Resolve<IServer> {
  constructor(private serverService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IServer> | Promise<IServer> | IServer {
    // console.log('route', route);
    // console.log('state', state);

    // + means casting value to be number
    return this.serverService.getServerById(+ route.params['id']);
  }
}
