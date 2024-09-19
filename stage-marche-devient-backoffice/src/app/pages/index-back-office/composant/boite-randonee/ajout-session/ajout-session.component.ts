import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { catchError, Observable, of, shareReplay } from 'rxjs';

import { Session } from '../../../../../intefaces/session';
import { Theme } from '../../../../../intefaces/theme';
import { ApiFetcherSessionService } from '../../../../../services/api-fetcher-session.service';
import { ApiFetcherThemeService } from '../../../../../services/api-fetcher-theme.service';

@Component({
  selector: 'app-ajout-session',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: './ajout-session.component.html',
  styleUrl: './ajout-session.component.scss'
})
export class AjoutSessionComponent {
  // Injection des services
  private appelleAPISession = inject(ApiFetcherSessionService);
  private appelleAPITheme = inject(ApiFetcherThemeService);

  // Propriété d'entrée pour l'ID de la randonnée
  @Input() idRandonnee?: number;

  // Propriétés pour le formulaire
  lieuSession?: string;
  dateDebutSession?: string;
  dateFinSession?: string;
  themeSession: number = 0;

  // Observable pour la liste des thèmes
  public themes$: Observable<Theme[]> = this.appelleAPITheme.recupererThemeList().pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération des thèmes:', error);
      return of([]);
    }),
    shareReplay(1)
  );

  // Méthode pour envoyer le formulaire de session
  envoieFormSession() {
    if (this.formulaireEstValide()) {
      const sessionAAjouter: Session = {
        idSession: null,
        lieu: this.lieuSession!,
        dateDebut: this.dateDebutSession!,
        dateFin: this.dateFinSession!,
        randonneeId: this.idRandonnee!,
        themeId: this.themeSession!,
      };

      this.appelleAPISession.ajoutSession(sessionAAjouter).subscribe({
        next: (response) => {
          if (response >= 200 && response < 300) {
            alert("La session a bien été ajoutée");
            this.reinitialiserFormulaire();
          } else {
            alert('Erreur de création : ' + response);
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la session:', error);
          alert('Une erreur est survenue lors de l\'ajout de la session.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs du formulaire.');
    }
  }

  // Méthode pour vérifier si le formulaire est valide
  private formulaireEstValide(): boolean {
    return !!this.lieuSession && 
           !!this.dateDebutSession && 
           !!this.dateFinSession && 
           !!this.idRandonnee && 
           !!this.themeSession;
  }

  // Méthode pour réinitialiser le formulaire
  private reinitialiserFormulaire() {
    this.lieuSession = undefined;
    this.dateDebutSession = undefined;
    this.dateFinSession = undefined;
    this.themeSession = 0;
  }
}