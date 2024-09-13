import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'; // Importation des classes nécessaires pour faire des requêtes HTTP et gérer les erreurs HTTP.
import { Injectable, inject } from '@angular/core'; // Importation des décorateurs et fonctions pour créer et injecter des services Angular.
import { Observable, catchError, map, of } from 'rxjs'; // Importation des opérateurs RxJS pour travailler avec les Observables.
import { Theme } from '../intefaces/theme';  // Importation de l'interface Theme qui définit la structure d'un thème.

@Injectable({
  providedIn: 'root' // Fournit ce service à la racine de l'application, le rendant disponible partout.
})
export class ApiFetcherThemeService {

  private endPointUrl: string = "https://localhost:7092/api/Theme"; // URL de base pour l'API des thèmes.

  httpClient = inject(HttpClient); // Injection du service HttpClient pour effectuer des requêtes HTTP.

  // Méthode pour récupérer la liste des thèmes.
  recupererThemeList(): Observable<any> {
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

  // Méthode pour récupérer un thème par son ID.
  recupererThemeParId(id: number): Observable<any> {
    return this.httpClient.get(`${this.endPointUrl}/${id}`, { observe: 'response' }) // Requête GET pour un thème spécifique.
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

  // Méthode pour ajouter un nouveau thème.
  async ajoutTheme(theme: Theme): Promise<Observable<any>> {
    return this.httpClient.post(`${this.endPointUrl}`, { "nomTheme": theme.nomTheme }, { observe: 'response' }) // Requête POST pour ajouter un thème.
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

  // Méthode pour supprimer un thème par son ID.
  async supprimerTheme(id: number): Promise<Observable<any>> {
    return this.httpClient.delete(`${this.endPointUrl}/${id}`, { observe: 'response' }) // Requête DELETE pour supprimer un thème.
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

  // Méthode pour mettre à jour un thème par son ID.
  majTheme(id: number, theme: Theme): Observable<any> {
    return this.httpClient.put(`${this.endPointUrl}/${id}`, { "idTheme": id, "nomTheme": theme.nomTheme }, { observe: 'response' }) // Requête PUT pour mettre à jour un thème.
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