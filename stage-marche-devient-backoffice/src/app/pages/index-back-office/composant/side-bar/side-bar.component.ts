import { Component, inject } from '@angular/core';
import { SelecteurBoiteCommandeAdminService } from '../../service/selecteur-boite-commande-admin.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  selecteurBoite = inject(SelecteurBoiteCommandeAdminService);

  SelectionBoiteGeneral(){
    this.selecteurBoite.choixPanelCommande("general");
  }
  
  SelectionBoiteRandonee(){
    this.selecteurBoite.choixPanelCommande("randonnee");
  }

  SelectionBoiteUtilisateur(){
    this.selecteurBoite.choixPanelCommande("utilisateur");
  }
}
