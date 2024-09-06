import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Posseder } from '../intefaces/posseder';

// Déclare ce service comme injectable et disponible dans toute l'application
@Injectable({
  providedIn: 'root'
})
export class ApiFetcherPossederService {
  constructor() { };

  // Injection du HttpClient pour effectuer des requêtes HTTP
  httpClient = inject(HttpClient);

  // URL de base pour les requêtes API
  private endPointUrl: string = "https://localhost:7092/api/Posseder";
  
  // Méthode pour récupérer la liste complète des objets Posseder
  RecupererListePosseder(): Observable<any> {
    return this.httpClient.get<Posseder[]>(this.endPointUrl, { observe: 'response' })
      .pipe(
        // Traitement de la réponse
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);
          
          // Vérification du statut de la réponse
          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        // Gestion des erreurs
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  // Méthode pour récupérer la liste des Posseder par ID de publication
  RecupererListePossederParPublication(idPublication: number): Observable<any> {
    return this.httpClient.get(this.endPointUrl + "/idPublication:" + idPublication, { observe: 'response' })
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

  // Méthode pour récupérer la liste des Posseder par ID de tag
  RecupererListePossederParTag(idTag: number): Observable<any> {
    return this.httpClient.get(this.endPointUrl + "/idTagPublication:" + idTag, { observe: 'response' })
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

  // Méthode pour récupérer un Posseder spécifique par IDs de publication et de tag
  RecupererPossederParIds(idPublication: number, idTag: number): Observable<any> {
    return this.httpClient.get(this.endPointUrl + "/" + idPublication + "," + idTag, { observe: 'response' })
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

  // Méthode pour ajouter un nouveau Posseder
  AjouterPosseder(idPublication: number, idTag: number): Observable<any> {
    return this.httpClient.post(this.endPointUrl, { "idPublication": idPublication, "idTagPublication": idTag }, { observe: 'response' })
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

  // Méthode pour supprimer un Posseder
  SupressionPosseder(idPosseder: number): Observable<any> {
    return this.httpClient.delete(this.endPointUrl + `/${idPosseder}`, { observe: 'response' })
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

  // Méthode pour mettre à jour un Posseder
  MiseAJourPosseder(idPosseder: number, possederModif: Posseder): Observable<any> {
    return this.httpClient.put(this.endPointUrl + "/" + idPosseder, { "idPublication": possederModif.id_publication, "idTagPublication": possederModif.id_tag_publication }, { observe: 'response' })
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