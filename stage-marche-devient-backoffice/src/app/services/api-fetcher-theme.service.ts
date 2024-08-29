import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map , of } from 'rxjs';
import { Theme } from '../intefaces/theme';

@Injectable({
  providedIn: 'root'
})
export class ApiFetcherThemeService {

  private endPointUrl: string = "https://localhost:7260/api/Theme"

  httpClient = inject(HttpClient);
  
  recupererThemeList(): Observable<Theme[]>{
    let listfetched = this.httpClient.get<Theme[]>(`${this.endPointUrl}`);
    return listfetched;
  }

  recupererThemeParId(id: number): Observable<Theme>{
    return this.httpClient.get<Theme>(`${this.endPointUrl}/${id}`);
  } 

  
  async ajoutTheme(theme: Theme) {
     
    this.httpClient.post(`${this.endPointUrl}`, {
      "nomTheme":  theme.nom
    }).subscribe((res: any) => {
      if (res.result) {
        alert("Theme ajouter a l'appli")
      } else {
        alert(res.mess + "test")
      }
    })
    //debugger;
  }

  async supprimerTheme(id: number) {
    await this.httpClient.delete(`${this.endPointUrl}/${id}`)
        .subscribe((res: any) => {
          if(res == null){
            alert("supression reussie")
          }
          else{
            alert("supression non resolu")
          }
        });
        
  }

  majTheme(id: number,theme: Theme){
      this.httpClient.put(`${this.endPointUrl}/${id}`,{
        "nomTheme": theme.nom
      }).subscribe((res: any) => {
        if (res.result) {
          alert("Theme modifier dans l'appli")
        } else {
          alert(res.message)
        }
      })
  }
  getData(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.endPointUrl, { observe: 'response' });
  }
}
