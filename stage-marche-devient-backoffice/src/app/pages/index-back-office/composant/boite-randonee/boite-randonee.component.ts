import { Component, inject, OnInit } from '@angular/core';
import { Randonnee } from '../../../../intefaces/randonnee';
import { Session } from '../../../../intefaces/session';
import { ApiFetcherRandoneeService } from '../../../../services/api-fetcher-randonee.service';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AjoutRandonneeComponent } from "./ajout-randonnee/ajout-randonnee.component";
import { ModifRandonneeComponent } from "./modif-randonnee/modif-randonnee.component";
import { ViewChild } from '@angular/core';
import { ApiFetcherSessionService } from '../../../../services/api-fetcher-session.service';
import { ApiFetcherThemeService } from '../../../../services/api-fetcher-theme.service';
import { Theme } from '../../../../intefaces/theme';
import { FormsModule } from '@angular/forms';
import { AjoutSessionComponent } from "./ajout-session/ajout-session.component";
import { SelecteurBoiteCommandeAdminService } from '../../service/selecteur-boite-commande-admin.service';

@Component({
  selector: 'app-boite-randonee',
  standalone: true,
  imports: [CommonModule, AjoutRandonneeComponent, ModifRandonneeComponent, FormsModule, AjoutSessionComponent],
  templateUrl: './boite-randonee.component.html',
  styleUrl: './boite-randonee.component.scss'
})
export class BoiteRandoneeComponent implements OnInit {
  @ViewChild(ModifRandonneeComponent) composantModif!: ModifRandonneeComponent;

  afficherAjoutSession : boolean = false;
  idRandonneSessionAAjouter : number = 0;

  afficherComposant: boolean = true;
  afficherAjout: boolean = false;
  afficherModif: boolean = false;
  

  private appeleAPI = inject(ApiFetcherRandoneeService);
  private appeleAPISession = inject(ApiFetcherSessionService);
  private appeleAPITheme = inject(ApiFetcherThemeService);
  private selecteurBoiteCommande = inject(SelecteurBoiteCommandeAdminService);
  
  public listRandonnee$!: Observable<Randonnee[]>;
  public sessions$!: Observable<Session[]>;
  public themes$!: Observable<Theme[]>;

  randonneeFiltres$!: Observable<Randonnee[]>;
  searchTerm: string = '';

  ngOnInit() {
    this.initializeObservables();
    this.randonneeFiltres$ = this.listRandonnee$;

  }

  private initializeObservables() {
    //recupere la liste des rendonnee
    this.listRandonnee$ = this.appeleAPI.RecupererListeRandonee().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des randonnées:', error);
        return of([]);
      }),
      shareReplay(1)
    );

    //recupere la liste des session
    this.sessions$ = this.appeleAPISession.recupererSessionList().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des sessions:', error);
        return of([]);
      }),
      shareReplay(1)
    );

    //recupere la liste des theme
    this.themes$ = this.appeleAPITheme.recupererThemeList().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des sessions:', error);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  suppressiont(id: number, nomRandonnee: string) {
    if (confirm(`Es-tu sûr de vouloir supprimer la randonnée du nom de : ${nomRandonnee}`)) {
      this.appeleAPI.SupressionRandonnee(id).subscribe({
        next: (resultat) => {
          alert("" + resultat);
          this.rechargerComposant();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }

  rechargerComposant() {
    this.initializeObservables();
    this.randonneeFiltres$ = this.listRandonnee$;

  }

  switchAfficherAjoutRandonnee(etat:boolean) {
    this.afficherAjout = etat;
    if (etat = false) {
      this.rechargerComposant();
    }
  }
  switchAfficherAjoutSession(idRandonnee?:number){
    if(idRandonnee === undefined){
      this.afficherAjoutSession = false;
      this.rechargerComposant();
    }
    else{
      this.idRandonneSessionAAjouter = idRandonnee;
      this.afficherAjoutSession = true;
    }

  }

  switchAfficherModif(randoneeAModif: Randonnee | null) {
    if (randoneeAModif !== null) {
      this.afficherModif = true;
      setTimeout(() => {
        if (this.composantModif) {
          this.composantModif.CreationModif(randoneeAModif);
        } else {
          console.error('ModifRandonneeComponent not initialized');
        }
      }, 20);
    } else {
      this.afficherModif = false;
      this.rechargerComposant();
    }
  }

  afficherSession(idRandonnee: number): Observable<Session[]> {
    return this.sessions$.pipe(
      map(sessions => sessions.filter(session => session.randonneeId === idRandonnee))
    );
  }

  miseAJourThemeSession(sessionAMetreAJour : Session) : void{
    this.appeleAPISession.MiseAJourSession(sessionAMetreAJour.idSession!,sessionAMetreAJour).subscribe(response => {
      if(response >= 200 && response <300){
        alert("La session a bien été modifier")
      }
      else{ alert('Erreur de mise a jour :' + response)}
    });

  }
  supressionSession(idSession: number) : void{
    this.appeleAPISession.SupressionSession(idSession).subscribe(response => {
      console.log('Resultat mise a jour:', response);
      if(response >= 200 && response <300){
        alert("La session a bien été suprimmer")
      }
      else{ alert('Erreur de supression :' + response)}
    });
  }

  filtrerRandonneParNom(nomRecherche: string): Observable<Randonnee[]> {
    return this.listRandonnee$.pipe(
      map(randonnee => randonnee.filter(randonnee => 
        randonnee.nomRandonnee.toLowerCase().includes(nomRecherche.toLowerCase())))
    );
  }

  onSearchChange() {
    this.randonneeFiltres$ = this.filtrerRandonneParNom(this.searchTerm);
  }

  allerABoiteTheme(){
    this.selecteurBoiteCommande.choixPanelCommande('theme');
  }
}