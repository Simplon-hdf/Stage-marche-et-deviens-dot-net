import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelecteurBoiteCommandeAdminService {
  constructor() { }

  // Sujet privé pour gérer les changements de valeur
  private maValeurSubject = new Subject<string>()

  // Observable public pour permettre aux composants de s'abonner aux changements
  public boiteSelectioner$: Observable<string> = this.maValeurSubject;

  // Méthode publique pour mettre à jour la valeur sélectionnée
  public choixPanelCommande(nouvelleValeur: string) {
    this.maValeurSubject.next(nouvelleValeur);
  }
}
