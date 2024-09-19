import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { Observable, catchError, throwError }  from 'rxjs';
import { Theme } from '../Models/theme.model';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_ENDPOINT = '/api/Theme'; // Initialisation de la route de l'api.

  constructor(private api: ApiService) { } // Import de ApiService.

    // Fonction pour récupérer un thème par son ID

    getTheme(id: number): Observable<Theme> {
      const url = `${environment.apiBaseUrl}${this.THEME_ENDPOINT}/${id}`;// Initialisation de l'url de l'api.
      return this.api.get<Theme>(url).pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération du thème:', error);
          return throwError(() => new Error(`Échec de la récupération du thème: ${error.message}`));
        })
      );
    }


}
