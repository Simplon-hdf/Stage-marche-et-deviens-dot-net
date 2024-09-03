import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'; // Importation des classes nécessaires pour faire des requêtes HTTP et gérer les erreurs HTTP.
import { TagPublication } from '../intefaces/tag-publication';


@Injectable({
  providedIn: 'root'
})
export class ApiFetcherTagPublicationService {
  private endPointUrl: string = "https://localhost:7092/api/TagPublication"; // URL de base pour l'API des tags.

  httpClient = inject(HttpClient); // Injection du service HttpClient pour effectuer des requêtes HTTP.

  constructor() { }

  recupererTagPublicationList(): Observable<any> {
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

   // Méthode pour récupérer un tag par son ID.
   recupererTagPublicationParId(id: number): Observable<any> {
    return this.httpClient.get(`${this.endPointUrl}/${id}`, { observe: 'response' }) // Requête GET pour un tag spécifique.
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

  // Méthode pour ajouter un nouveau tag.
  async ajoutTagPublication(tagPublication: TagPublication): Promise<Observable<any>> {
    return this.httpClient.post(`${this.endPointUrl}`, { "nom": tagPublication.nom, "couleur": tagPublication.couleur }, { observe: 'response' }) // Requête POST pour ajouter un tag.
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

  // Méthode pour supprimer un tag par son ID.
  async supprimerTagPublication(id: number): Promise<Observable<any>> {
    return this.httpClient.delete(`${this.endPointUrl}/${id}`, { observe: 'response' }) // Requête DELETE pour supprimer un tag.
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

  // Méthode pour mettre à jour un tag par son ID.
  majTagPublication(id: number, tagPublication: TagPublication): Observable<any> {
    return this.httpClient.put(`${this.endPointUrl}/${id}`, tagPublication, { observe: 'response' })
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
