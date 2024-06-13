import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { IServer } from '../../models/server.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrl: './edit-server.component.scss',
})
export class EditServerComponent implements OnInit {
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
    console.log('queryParams', this.activatedRoute.queryParams);
    console.log('fragment', this.activatedRoute.fragment);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log('params', params);
      this.allowEdit = params['allowEdit'] == '1' ? true : false;
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      console.log('fragment', fragment);
    });

    this.server = this.serversService.getServerById(1);
    if (this.server) {
      this.serverName = this.server?.name;
      this.serverStatus = this.server?.status;
    }
  }

  onUpdateServer() {
    if (this.server) {
      this.serversService.updateServer(this.server?.id, {
        name: this.serverName,
        status: this.serverStatus,
      });
    }

    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
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
