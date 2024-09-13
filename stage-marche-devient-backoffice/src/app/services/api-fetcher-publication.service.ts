import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'; // Importation des classes nécessaires pour faire des requêtes HTTP et gérer les erreurs HTTP.
import { Injectable, inject } from '@angular/core'; // Importation des décorateurs et fonctions pour créer et injecter des services Angular.
import { Observable, catchError, map, of } from 'rxjs'; // Importation des opérateurs RxJS pour travailler avec les Observables.
import { Publication } from '../intefaces/publication';  // Importation de l'interface Publication qui définit la structure d'une publication.


@Injectable({
  providedIn: 'root'
})
export class ApiFetcherPublicationService {

  private endPointUrl: string = "https://localhost:7092/api/Publication"; // URL de base pour l'API des publications.

  httpClient = inject(HttpClient); // Injection du service HttpClient pour effectuer des requêtes HTTP.

  // Méthode pour récupérer la liste des publications.
  recupererPublicationList(): Observable<any> {
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
  
  // Méthode pour récupérer une publication par son ID.
  recupererPublicationParId(id: number): Observable<any> {
    return this.httpClient.get(`${this.endPointUrl}/${id}`, { observe: 'response' }) // Requête GET pour une publication spécifique.
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

  // Méthode pour ajouter une nouvelle Publication
  AjouterPublication(publicationAAjouter : Publication): Observable<any> {
    let heureDeCreation: string = new Date().toString();
    return this.httpClient.post(this.endPointUrl, { 
      "nomPublication": publicationAAjouter.nomPublication,
      "datePublication": publicationAAjouter.datePublication,
      "lienMedia": publicationAAjouter.lienMedia,
      "contenuTexte": publicationAAjouter.contenuTexte,
      "idSession": publicationAAjouter.idSession  
    },
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

    // Méthode pour supprimer un Publication
    SupressionPublication(idPublication: number): Observable<any> {
      return this.httpClient.delete(this.endPointUrl + `/${idPublication}`, { observe: 'response' })
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

    MiseAJourPublication(idPublication: number, publicationModif: Publication): Observable<any> {
      return this.httpClient.put(this.endPointUrl + "/" + idPublication, { 
        "idPublication": publicationModif.idPublication, 
        "nomPublication": publicationModif.nomPublication, 
        "datePublication": publicationModif.datePublication, 
        "lienMedia": publicationModif.lienMedia,
        "contenuTexte": publicationModif.contenuTexte,
        "idSession": publicationModif.idSession
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
