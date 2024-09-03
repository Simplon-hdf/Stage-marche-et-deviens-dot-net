import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelecteurBoiteCommandeAdminService {

  
  constructor() { }
  private maValeurSubject = new Subject<string>()
  public boiteSelectioner$ : Observable<string> = this.maValeurSubject;

  public choixPanelCommande(nouvelleValeur: string) {
    this.maValeurSubject.next(nouvelleValeur);
  }

  
  
}
