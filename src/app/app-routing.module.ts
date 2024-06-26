import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { IndividualServerComponent } from './servers/individual-server/individual-server.component';
import { authChildGuard } from './guards/auth-guard.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './guards/server.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id/:name', component: UserComponent },
  {
    path: 'servers',
    component: ServersComponent,
    canActivateChild: [authChildGuard],
    children: [
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: ':id',
        component: IndividualServerComponent,
        resolve: { server: serverResolver },
      },
    ],
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found from route ' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
