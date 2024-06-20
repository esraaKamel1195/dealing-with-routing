import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { IServer } from '../models/server.model';
import { ServersService } from '../servers/servers.service';
import { Observable } from 'rxjs';

export const serverResolver: ResolveFn<IServer> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  serversService: ServersService = inject(ServersService)
): Observable<IServer> | Promise<IServer> | IServer => {
  return serversService.getServerById(+route.params['id']);
};
