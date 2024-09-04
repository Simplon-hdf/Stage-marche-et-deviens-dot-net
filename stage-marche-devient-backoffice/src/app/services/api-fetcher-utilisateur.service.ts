import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Utilisateur } from '../intefaces/utilisateur';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiFetcherUtilisateurService {
  constructor() { }
  // Injection du HttpClient pour effectuer des requêtes HTTP
  httpClient = inject(HttpClient);

  // URL de base pour les requêtes API
  private endPointUrl: string = "https://localhost:7092/api/Utilisateur";
  
  // Méthode pour récupérer la liste complète des objets randonee
  RecupererListeUtilisitateur(): Observable<any> {
    return this.httpClient.get<Utilisateur[]>(this.endPointUrl, { observe: 'response' })
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
  AjouterUtilisitateur(utilisateurAAjouter : Utilisateur): Observable<any> {
    let heureDeCreation: string = new Date().toString();
    return this.httpClient.post(this.endPointUrl, { 
      "dateCreationUtilisateur": heureDeCreation,
      "prenomUtilisateur": utilisateurAAjouter.prenom,
      "nomUtilisateur": utilisateurAAjouter.nom,
      "telUtilisateur": utilisateurAAjouter.tel,
      "mdpUtilisateur": utilisateurAAjouter.mdp,
      "mailUtilisateur": utilisateurAAjouter.mail,
      "totalDistanceParcourueUtilisateur": 0,},
       { observe: 'response' , responseType: 'text' })
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
  SupressionUtilisitateur(idUtilisateur: number): Observable<any> {
    return this.httpClient.delete(this.endPointUrl + `/${idUtilisateur}`, { observe: 'response', responseType: 'text' })
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

  MiseAJourUtilisitateur(idUtilisateur: number, utilisateurModif: Utilisateur): Observable<any> {
    return this.httpClient.put(this.endPointUrl + "/" + idUtilisateur, { 
      "idUtilisateur": idUtilisateur, 
      "dateCreationUtilisateur": utilisateurModif.dateCreation,
      "prenomUtilisateur": utilisateurModif.prenom,
      "nomUtilisateur": utilisateurModif.nom,
      "telUtilisateur": utilisateurModif.tel,
      "mdpUtilisateur": utilisateurModif.mdp,
      "mailUtilisateur": utilisateurModif.mail,
      "totalDistanceParcourueUtilisateur": 0,}, { observe: 'response' , responseType: 'text' })
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
