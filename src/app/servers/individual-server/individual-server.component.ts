import { Component, OnInit } from '@angular/core';
import { IServer } from '../../models/server.model';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

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
  ) {}

  ngOnInit(): void {
    // this.id = this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServerById(this.id);

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServerById(+params['id']);
    // });

    this.activatedRoute.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
  }

  onEdit() {
    // this.router.navigate(['edit']);
    this.router.navigate(['edit'], {
      queryParams: { allowEdit: this.server?.id === 3 ? 1 : 0 },
      relativeTo: this.activatedRoute,
    });
  }
}
