import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { IServer } from '../../models/server.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrl: './edit-server.component.scss',
})
export class EditServerComponent implements OnInit {
  server?: IServer;
  serverName: string = '';
  serverStatus: string = '';

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('queryParams', this.activatedRoute.queryParams);
    console.log('fragment', this.activatedRoute.fragment);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log('params', params);
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
  }
}
