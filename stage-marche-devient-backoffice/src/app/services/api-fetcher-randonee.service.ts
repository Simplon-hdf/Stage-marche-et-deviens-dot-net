import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Randonnee } from '../intefaces/randonnee';
@Injectable({
  providedIn: 'root'
})
export class ApiFetcherRandoneeService {

  constructor() { }
  // Injection du HttpClient pour effectuer des requêtes HTTP
  httpClient = inject(HttpClient);

  // URL de base pour les requêtes API
  private endPointUrl: string = "https://localhost:7092/api/Randonnee";
  
  // Méthode pour récupérer la liste complète des objets randonee
  RecupererListeRandonee(): Observable<any> {
    return this.httpClient.get<Randonnee[]>(this.endPointUrl, { observe: 'response' })
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

  // Méthode pour ajouter un nouveau Posseder
  AjouterRandonnee(randoneeAAjouter : Randonnee): Observable<any> {
    return this.httpClient.post(this.endPointUrl, { 
      "nomRandonnee": randoneeAAjouter.nomRandonnee,
      "descriptionRandonnee":randoneeAAjouter.descriptionRandonnee,
      "lieuRandonnee": randoneeAAjouter.lieuRandonnee,
      "imageRandonnee": randoneeAAjouter.imageRandonnee,
      "prixRandonnee": randoneeAAjouter.prixRandonnee,
      "nbrNuitRandonnee": randoneeAAjouter.nbrNuitRandonnee,
      "minimumParticipant": randoneeAAjouter.minimumParticipant,
      "maximumParticipant": randoneeAAjouter.maximumParticipant,
      "estVisible": randoneeAAjouter.estVisible,
      "distanceKmRandonnee": randoneeAAjouter.distanceKmRandonnee}, { observe: 'response' })
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
  SupressionRandonnee(idRandonnee: number): Observable<any> {
    return this.httpClient.delete(this.endPointUrl + `/${idRandonnee}`, { observe: 'response', responseType: 'text' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);
  
          if (response.status >= 200 && response.status < 300) {
            return response.body; // Ici, response.body sera une chaîne de texte
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

  MiseAJourRandonnee(idRandonnee: number, randonneeModif: Randonnee): Observable<any> {
    return this.httpClient.put(this.endPointUrl + "/" + idRandonnee, { 
      "idRandonnee": idRandonnee,
      "nomRandonnee": randonneeModif.nomRandonnee,
      "descriptionRandonnee":randonneeModif.descriptionRandonnee,
      "lieuRandonnee": randonneeModif.lieuRandonnee,
      "imageRandonnee": randonneeModif.imageRandonnee,
      "prixRandonnee": randonneeModif.prixRandonnee,
      "nbrNuitRandonnee": randonneeModif.nbrNuitRandonnee,
      "minimumParticipant": randonneeModif.minimumParticipant,
      "maximumParticipant": randonneeModif.maximumParticipant,
      "estVisible": randonneeModif.estVisible,
      "distanceKmRandonnee": randonneeModif.distanceKmRandonnee}, { observe: 'response' })
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
