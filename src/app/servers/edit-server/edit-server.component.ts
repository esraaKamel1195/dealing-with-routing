import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { IServer } from '../../models/server.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrl: './edit-server.component.scss',
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server?: IServer;
  serverName: string = '';
  serverStatus: string = '';
  allowEdit: boolean = false;
  changesSaved: boolean;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] == '1' ? true : false;
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      // console.log('fragment', fragment);
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.server = this.serversService.getServerById(params['id']);
      if (this.server) {
        this.serverName = this.server?.name;
        this.serverStatus = this.server?.status;
      }
    });
  }

  onUpdateServer() {
    if (this.server && this.allowEdit) {
      this.serversService.updateServer(this.server?.id, {
        name: this.serverName,
        status: this.serverStatus,
      });
    }

    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    // business logic
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server?.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm("Are you sure to discard changes");
    }
    else {
      return false;
    }
  }
}
