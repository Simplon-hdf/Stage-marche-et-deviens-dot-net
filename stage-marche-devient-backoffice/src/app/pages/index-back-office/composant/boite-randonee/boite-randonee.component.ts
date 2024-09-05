import { Component, inject } from '@angular/core';
import { Randonnee } from '../../../../intefaces/randonnee';
import { ApiFetcherRandoneeService } from '../../../../services/api-fetcher-randonee.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boite-randonee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boite-randonee.component.html',
  styleUrl: './boite-randonee.component.scss'
})
export class BoiteRandoneeComponent {
  appeleAPI = inject(ApiFetcherRandoneeService);
  public messageRetourAPiListRando$: any;
  ngOnInit(){
     this.messageRetourAPiListRando$ = this.appeleAPI.RecupererListeRandonee().subscribe();
  }
}
