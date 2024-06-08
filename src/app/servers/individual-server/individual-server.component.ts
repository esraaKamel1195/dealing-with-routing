import { Component, OnInit } from '@angular/core';
import { IServer } from '../../models/server.model';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-individual-server',
  templateUrl: './individual-server.component.html',
  styleUrl: './individual-server.component.scss'
})
export class IndividualServerComponent implements OnInit {
  server?: IServer;

  constructor(private serversService: ServersService) {
  }

  ngOnInit(): void {
    this.server = this.serversService.getServerById(1);
  }
}
