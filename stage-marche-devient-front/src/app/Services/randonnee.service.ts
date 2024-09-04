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
}