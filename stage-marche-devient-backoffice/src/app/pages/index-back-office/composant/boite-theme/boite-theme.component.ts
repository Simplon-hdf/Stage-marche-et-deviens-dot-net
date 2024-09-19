import { Component, inject } from '@angular/core';
import { SelecteurBoiteCommandeAdminService } from '../../service/selecteur-boite-commande-admin.service';
import { ApiFetcherThemeService } from '../../../../services/api-fetcher-theme.service';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { Theme } from '../../../../intefaces/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boite-theme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boite-theme.component.html',
  styleUrl: './boite-theme.component.scss'
})
export class BoiteThemeComponent {
  // Injection des services nécessaires
  selecteurBoiteCommande = inject(SelecteurBoiteCommandeAdminService);
  appeleAPITheme = inject(ApiFetcherThemeService);

  // Variables pour gérer l'affichage des formulaires
  estAfficherModifTheme: boolean = false;
  estAfficherAjoutTheme: boolean = false;
  nomThemeAjout: string = "";
  
  // Observable pour stocker la liste des thèmes
  listTheme$!: Observable<Theme[]>

  ngOnInit() {
    this.initializeObservables();
  }

  private initializeObservables() {
    // Récupération de la liste des thèmes depuis l'API
    this.listTheme$ = this.appeleAPITheme.recupererThemeList().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des randonnées:', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      }),
      shareReplay(1) // Partage le dernier résultat émis avec les nouveaux abonnés
    );
  }

  // Méthode pour naviguer vers la boîte de randonnée
  allerABoiteRandonnee() {
    this.selecteurBoiteCommande.choixPanelCommande('randonnee');
  }

  // Méthode pour supprimer un thème
  suppressiontTheme(themeASupprimer: Theme) {
    if (confirm(`Es-tu sûr de vouloir supprimer le theme du nom de : ${themeASupprimer.nomTheme}`)) {
      this.appeleAPITheme.supprimerTheme(themeASupprimer.idTheme!).subscribe(response => {
        if (response >= 200 && response < 300) {
          alert("Le theme a bien été surpprimer")
          this.initializeObservables(); // Rafraîchit la liste des thèmes
        }
        else { alert('Erreur de supréssion :' + response) }
        this.initializeObservables();
      });
    }
  }

  // Méthode pour modifier un thème
  ModificationTheme(theme?: Theme) {
    if (theme != undefined && theme.idTheme != undefined) {
      this.appeleAPITheme.majTheme(theme.idTheme, theme).subscribe(response => {
        if (response >= 200 && response < 300) {
          alert("Le theme a bien été modifier")
          this.initializeObservables(); // Rafraîchit la liste des thèmes
        }
        else { alert('Erreur de mise a jour :' + response) }
        this.initializeObservables();
      });
    }
    else {
      // Gestion du cas où le thème est undefined ou n'a pas d'ID
    }
  }

  // Méthodes pour gérer l'affichage du formulaire d'ajout de thème
  afficherAjoutTheme() {
    this.estAfficherAjoutTheme = true
  }

  fermerAjoutTheme() {
    this.estAfficherAjoutTheme = false
  }

  // Méthode pour créer un nouveau thème
  creationTheme() {
    let themeAjout: Theme = {
      idTheme: undefined,
      nomTheme: this.nomThemeAjout
    }
    this.appeleAPITheme.ajoutTheme(themeAjout).subscribe(response => {
      if (response >= 200 && response < 300) {
        alert("Le theme a bien été ajouter")
        this.initializeObservables(); // Rafraîchit la liste des thèmes
        this.fermerAjoutTheme();
      }
      else { alert('Erreur:' + response) }
    });
  }
}