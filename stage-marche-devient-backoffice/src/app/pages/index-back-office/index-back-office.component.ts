import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiFetcherPossederService } from '../../services/api-fetcher-posseder.service';
import { SelecteurBoiteCommandeAdminService } from './service/selecteur-boite-commande-admin.service';
import { map, Observable } from 'rxjs';
import { SideBarComponent } from "./composant/side-bar/side-bar.component";
import { BoiteGeneralComponent } from "./composant/boite-general/boite-general.component";
import { BoiteRandoneeComponent } from "./composant/boite-randonee/boite-randonee.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ApiFetcherUtilisateurService } from '../../services/api-fetcher-utilisateur.service';
import { BoiteUtilisateurComponent } from "./composant/boite-utilisateur/boite-utilisateur.component";

@Component({
  selector: 'app-index-back-office',
  standalone: true,
  imports: [SideBarComponent, AsyncPipe, BoiteGeneralComponent, CommonModule, BoiteRandoneeComponent, BoiteUtilisateurComponent],
  templateUrl: './index-back-office.component.html',
  styleUrls: ['./index-back-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexBackOfficeComponent implements OnInit {
  private apiFetcher = inject(ApiFetcherUtilisateurService);
  private boiteDeCommande = inject(SelecteurBoiteCommandeAdminService);
  boiteSelectionnee$: Observable<string> = this.boiteDeCommande.boiteSelectioner$;

  ngOnInit() {
    this.boiteDeCommande.choixPanelCommande("general");
  }
}

