import { Component, inject } from '@angular/core';
import { Randonnee } from '../../../../intefaces/randonnee';
import { ApiFetcherRandoneeService } from '../../../../services/api-fetcher-randonee.service';
import { map, Observable ,of} from 'rxjs';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AjoutRandonneeComponent } from "./ajout-randonnee/ajout-randonnee.component";

@Component({
  selector: 'app-boite-randonee',
  standalone: true,
  imports: [CommonModule, AjoutRandonneeComponent],
  templateUrl: './boite-randonee.component.html',
  styleUrl: './boite-randonee.component.scss'
})
export class BoiteRandoneeComponent {
  afficherComposant : boolean = true;
  afficherAjout : boolean = false;
  appeleAPI = inject(ApiFetcherRandoneeService);
  public listRandonnee$:Observable<Randonnee[]> = this.appeleAPI.RecupererListeRandonee();
  ngOnInit(){
  }

  suppressiont(id:number, nomRandonnee: string){
    if(confirm(`Est-tu sur de vouloir suprimer la randonnée du nom de :${nomRandonnee}`)){
      this.appeleAPI.SupressionRandonnee(id).subscribe({
        next: (resultat) =>{
          alert("" + resultat)
        }
      }); 
    }
    this.listRandonnee$ = this.appeleAPI.RecupererListeRandonee();
  }
  rechargerComposant() {
    this.listRandonnee$ = this.appeleAPI.RecupererListeRandonee();
  }

  switchAfficherAjour(){
    if(this.afficherAjout){
      this.afficherAjout = false;
    }
    else{
      this.afficherAjout = true;
    }
    this.rechargerComposant()
  }

}
