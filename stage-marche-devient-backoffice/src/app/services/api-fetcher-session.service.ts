import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Session } from '../intefaces/session';

@Injectable({
  providedIn: 'root'
})
export class ApiFetcherSessionService {

  private endPointUrl: string = "https://localhost:7092/api/Session"; // URL de base pour l'API des tags.

  httpClient = inject(HttpClient); // Injection du service HttpClient pour effectuer des requêtes HTTP.

  constructor() { }

  recupererSessionList(): Observable<any> {
    return this.httpClient.get(`${this.endPointUrl}`, { observe: 'response' }) // Effectue une requête GET et observe la réponse complète.
      .pipe(
        map(response => {
          console.log('Status:', response.status); // Affiche le statut HTTP dans la console.
          console.log('Body:', response.body); // Affiche le corps de la réponse dans la console.
          // Retourne le corps de la réponse si le statut est un code de succès (2xx).
          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`); // Lance une erreur si le statut n'est pas un succès.
          }
        }),
        catchError(error => {
          console.error('Error:', error); // Affiche l'erreur dans la console.
          return of(null); // Retourne un Observable contenant null en cas d'erreur.
        })
      );
  }

   // Méthode pour récupérer un session par son ID.
   recupererSessionParId(id: number): Observable<any> {
    return this.httpClient.get(`${this.endPointUrl}/${id}`, { observe: 'response' }) // Requête GET pour un session spécifique.
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);
          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  // Méthode pour ajouter un nouveau session.
  async ajoutSession( 
    lieu: string,
    dateDebut: string,
    dateFin: string,
    randonneeId: number|null,
    themeId: number|null,
  ): Promise<Observable<any>> {
    return this.httpClient.post(`${this.endPointUrl}`, { 
      "lieu": lieu,
      "dateDebut": dateDebut,
      "dateFin": dateFin,
      "randonneeId": randonneeId,
      "themeId": themeId 
    }, { observe: 'response' }) // Requête POST pour ajouter un session.
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);
          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  // Méthode pour supprimer un Session
  SupressionSession(idSession: number): Observable<any> {
    return this.httpClient.delete(this.endPointUrl + `/${idSession}`, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  // Méthode pour mettre à jour un Session
  MiseAJourSession(idSession: number, sessionModif: Session): Observable<any> {
    return this.httpClient.put(this.endPointUrl + "/" + idSession, {
      "idSession": sessionModif.idSession,
      "lieu": sessionModif.lieu,
      "dateDebut": sessionModif.dateDebut,
      "dateFin": sessionModif.dateFin,
      "randonneeId": sessionModif.randonneeId,
      "themeId": sessionModif.themeId
    }, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }
}
