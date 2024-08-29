import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Posseder } from '../intefaces/posseder';

@Injectable({
  providedIn: 'root'
})
export class ApiFetcherPossederService {
  constructor() { };
  httpClient = inject(HttpClient)
  private endPointUrl: string = "https://localhost:7092/api/Posseder";
  
  RecupererListePosseder(): Observable<Posseder[]>{
    return this.httpClient.get<Posseder[]>(this.endPointUrl);
  }

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
  RecupererListePossederParTag(idTag : number): Observable<Posseder[]>{
    return this.httpClient.get<Posseder[]>(this.endPointUrl + "/idTagPublication:" + idTag)
  }

  RecupererPossederParIds(idPublication : number , idTag : number): Observable<Posseder>{
    return this.httpClient.get<Posseder>(this.endPointUrl + "/" + idPublication + "," + idTag);
  }


}
