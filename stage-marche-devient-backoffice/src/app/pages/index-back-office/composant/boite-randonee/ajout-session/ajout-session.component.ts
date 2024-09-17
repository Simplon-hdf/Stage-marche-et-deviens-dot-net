import { Component, inject, Input, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Session } from '../../../../../intefaces/session';
import { ApiFetcherSessionService } from '../../../../../services/api-fetcher-session.service';
import { Theme } from '../../../../../intefaces/theme';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { ApiFetcherThemeService } from '../../../../../services/api-fetcher-theme.service';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-ajout-session',
  standalone: true,
  imports: [FormsModule,AsyncPipe,CommonModule],
  templateUrl: './ajout-session.component.html',
  styleUrl: './ajout-session.component.scss'
})
export class AjoutSessionComponent {
  appelleAPISession = inject(ApiFetcherSessionService)
  appelleAPITheme = inject(ApiFetcherThemeService)
  @Input() idRandonnee?: number;
  lieuSession?:string;
  dateDebutSession?:string;
  dateFinSession?:string;
  themeSession:number = 0;

  public themes$ = this.appelleAPITheme.recupererThemeList();

  //recupere la liste des theme
  

  envoieFormSession(){
    let sessionAAjouter: Session = {
      idSession: null,
      lieu: this.lieuSession!,
      dateDebut: this.dateDebutSession!,
      dateFin: this.dateFinSession!,
      randonneeId: this.idRandonnee!,
      themeId: this.themeSession!,
    }
    console.log(sessionAAjouter)

    if(this.lieuSession != undefined && 
      this.dateDebutSession != undefined &&
      this.dateFinSession != undefined &&
      this.idRandonnee != undefined &&
      this.themeSession != undefined ){
      
      this.appelleAPISession.ajoutSession(sessionAAjouter).subscribe(response => {
        console.log('Resultat mise a jour:', response);
        if(response >= 200 && response <300){
          alert("La session a bien été modifier")
        }
        else{ alert('Erreur de creation :' + response)}
      });
    }
    else{
      alert('les champs ne sont il pas tous remplie')
    }
    
  }

}
