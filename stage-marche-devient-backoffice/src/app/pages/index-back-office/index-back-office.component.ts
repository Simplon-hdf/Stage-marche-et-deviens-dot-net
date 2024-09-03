import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiFetcherPossederService } from '../../services/api-fetcher-posseder.service';
import { SelecteurBoiteCommandeAdminService } from './service/selecteur-boite-commande-admin.service';
import { map, Observable } from 'rxjs';
import { SideBarComponent } from "./composant/side-bar/side-bar.component";
import { BoiteGeneralComponent } from "./composant/boite-general/boite-general.component";
import { BoiteRandoneeComponent } from "./composant/boite-randonee/boite-randonee.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ApiFetcherRandoneeService } from '../../services/api-fetcher-randonee.service';
import { Randonnee } from '../../intefaces/randonnee';

@Component({
  selector: 'app-index-back-office',
  standalone: true,
  imports: [SideBarComponent, AsyncPipe, BoiteGeneralComponent, CommonModule, BoiteRandoneeComponent],
  templateUrl: './index-back-office.component.html',
  styleUrls: ['./index-back-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexBackOfficeComponent implements OnInit {
  private apiFetcher = inject(ApiFetcherRandoneeService);
  private boiteDeCommande = inject(SelecteurBoiteCommandeAdminService);
  boiteSelectionnee$: Observable<string> = this.boiteDeCommande.boiteSelectioner$;

  ngOnInit() {
    this.boiteDeCommande.choixPanelCommande("general");
    let randoAjout: Randonnee = {
      id: null,
      nom: "test",
      description: "test",
      lieu: "test",
      image: "test",
      prix: 100,
      nbrNuit: 100,
      minParticipant: 100,
      maxParticipant: 100,
      visibleFront: false,
      DistanceEnKm: 100,
    } 
    this.apiFetcher.MiseAJourRandonnee(10,randoAjout).subscribe();
  }
}

