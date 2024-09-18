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
  imports: [CommonModule,FormsModule],
  templateUrl: './boite-theme.component.html',
  styleUrl: './boite-theme.component.scss'
})
export class BoiteThemeComponent {
  selecteurBoiteCommande = inject(SelecteurBoiteCommandeAdminService);
  appeleAPITheme = inject(ApiFetcherThemeService);

  estAfficherModifTheme : boolean = false;
  estAfficherAjoutTheme : boolean = false;
  nomThemeAjout: string = "";
  
  listTheme$!: Observable<Theme[]>

  ngOnInit() {
    this.initializeObservables();
  }

  private initializeObservables() {
    //recupere la liste des rendonnee
    this.listTheme$ = this.appeleAPITheme.recupererThemeList().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des randonnées:', error);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  allerABoiteRandonnee(){
    this.selecteurBoiteCommande.choixPanelCommande('randonnee');
  }
  suppressiontTheme(themeASupprimer : Theme){
    if (confirm(`Es-tu sûr de vouloir supprimer le theme du nom de : ${themeASupprimer.nomTheme}`)) {
      this.appeleAPITheme.supprimerTheme(themeASupprimer.idTheme!).subscribe(response => {
        if(response >= 200 && response <300){
          alert("Le theme a bien été surpprimer")
          this.initializeObservables();
        }
        else{ alert('Erreur de supréssion :' + response)}
        this.initializeObservables();
      });
    }
  }
  ModificationTheme(theme?:Theme){
    if(theme != undefined && theme.idTheme != undefined){
      this.appeleAPITheme.majTheme(theme.idTheme,theme).subscribe(response => {
        if(response >= 200 && response <300){
          alert("Le theme a bien été modifier")
          this.initializeObservables();
        }
        else{ alert('Erreur de mise a jour :' + response)}
        this.initializeObservables();
      });
    }
    else{

    }

  }
  afficherAjoutTheme(){
    this.estAfficherAjoutTheme = true
  }
  fermerAjoutTheme(){
    this.estAfficherAjoutTheme = false
  }
  creationTheme(){
    let themeAjout: Theme = {
      idTheme: undefined,
      nomTheme: this.nomThemeAjout
    }
    this.appeleAPITheme.ajoutTheme(themeAjout).subscribe(response => {
      if(response >= 200 && response <300){
        alert("Le theme a bien été ajouter")
        this.initializeObservables();
        this.fermerAjoutTheme();
      }
      else{ alert('Erreur:' + response)}
    });
  }

}
