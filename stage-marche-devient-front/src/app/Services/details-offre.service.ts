import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsOffreService {
  private apiUrl = 'https://localhost:7260/api/Randonnee';

  constructor(private http: HttpClient) { }

  getProgramData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
