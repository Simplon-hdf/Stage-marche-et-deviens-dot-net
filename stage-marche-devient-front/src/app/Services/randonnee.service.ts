import { Injectable } from '@angular/core';
import { ApiService } from "./api/api.service";
import { Observable, catchError, throwError } from "rxjs";
import { Randonnee } from "../Models/randonnee.model";
import { environment } from "../Environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RandonneeService {
  private readonly RANDONNEE_ENDPOINT = '/api/Randonnee'; // Initialisation de la route de l'api.
  private currentRandonneeId: number | null = null;
  constructor(private api: ApiService) { } // Import de ApiService.

  // Fonction qui permet de récupérer les données des randonnées.
  getRandos(): Observable<Randonnee[]> {
    const url = `${environment.apiBaseUrl}${this.RANDONNEE_ENDPOINT}`; // Initialisation de l'url de l'api.
    console.log('Calling API at:', url); // Message qui confirm bien l'appel de l'api.
    return this.api.get<Randonnee[]>(url).pipe( // Appel de la méthode get du service api qui va récupérer le model de Randonnée en tableau [] sur l'url de l'api (url).
      catchError(error => {
        console.error('Erreur détaillée:', error);
        return throwError(() => new Error(`Échec de la récupération des randonnées: ${error.message}`)); // Si erreur message + erreur spécifique.
      })
    );
  }

  // Fonction qui permet de récupérer une randonnée par son ID.
  getRandonnee(id: number): Observable<Randonnee> {
    const url = `${environment.apiBaseUrl}${this.RANDONNEE_ENDPOINT}/${id}`; // URL spécifique à la randonnée avec l'ID, ensuite  elle utilise le service ApiService pour faire un appel GET à l'API pour récupérer les détails de cette randonnée.
                                                          // L'URL est formée en ajoutant l'id à la fin de l'URL de l'API (${this.RANDONNEE_ENDPOINT}/${id})//
    return this.api.get<Randonnee>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de la randonnée:', error);
        return throwError(() => new Error(`Échec de la récupération de la randonnée: ${error.message}`));
      })  //Si  erreur =elle est capturée et un message est retourné via throwError.
    );
  }

  // Fonction pour définir l'ID de la randonnée actuelle
  setCurrentRandonneeId(id: number): void {
    this.currentRandonneeId = id;
  }

  // Fonction pour obtenir l'ID de la randonnée actuelle
  getRandonneeId(): number | null {
    return this.currentRandonneeId;
  }
}