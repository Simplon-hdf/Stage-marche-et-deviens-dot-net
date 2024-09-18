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
import { BoiteThemeComponent } from "./composant/boite-theme/boite-theme.component";

@Component({
  selector: 'app-index-back-office',
  standalone: true,
  imports: [
    SideBarComponent, 
    AsyncPipe, 
    BoiteGeneralComponent, 
    CommonModule, 
    BoiteRandoneeComponent, 
    BoiteUtilisateurComponent, 
    BoiteThemeComponent
  ],
  templateUrl: './index-back-office.component.html',
  styleUrls: ['./index-back-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Utilisation de la stratégie OnPush pour optimiser les performances
})
export class IndexBackOfficeComponent implements OnInit {
  // Injection des services nécessaires
  private apiFetcher = inject(ApiFetcherUtilisateurService);
  private boiteDeCommande = inject(SelecteurBoiteCommandeAdminService);

  // Observable pour suivre la boîte de commande sélectionnée
  boiteSelectionnee$: Observable<string> = this.boiteDeCommande.boiteSelectioner$;

  ngOnInit() {
    // Initialisation de la boîte de commande à "general" au démarrage du composant
    this.boiteDeCommande.choixPanelCommande("general");
  }
}

