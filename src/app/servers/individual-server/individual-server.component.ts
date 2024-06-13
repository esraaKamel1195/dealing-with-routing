import { Component, OnInit } from '@angular/core';
import { IServer } from '../../models/server.model';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-individual-server',
  templateUrl: './individual-server.component.html',
  styleUrl: './individual-server.component.scss',
})
export class IndividualServerComponent implements OnInit {
  server?: IServer;
  id: any;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServerById(this.id);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.server = this.serversService.getServerById(+params['id']);
    });
  }

  onEdit() {
    // this.router.navigate(['edit', {id: 1}]);
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }
}
