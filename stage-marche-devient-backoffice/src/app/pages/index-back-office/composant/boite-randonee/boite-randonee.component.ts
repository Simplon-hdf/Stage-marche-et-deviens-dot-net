import { Component, inject } from '@angular/core';
import { Randonnee } from '../../../../intefaces/randonnee';
import { ApiFetcherRandoneeService } from '../../../../services/api-fetcher-randonee.service';
import { map, Observable ,of} from 'rxjs';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AjoutRandonneeComponent } from "./ajout-randonnee/ajout-randonnee.component";
import { ModifRandonneeComponent } from "./modif-randonnee/modif-randonnee.component";
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-boite-randonee',
  standalone: true,
  imports: [CommonModule, AjoutRandonneeComponent, ModifRandonneeComponent],
  templateUrl: './boite-randonee.component.html',
  styleUrl: './boite-randonee.component.scss'
})
export class BoiteRandoneeComponent {
  @ViewChild(ModifRandonneeComponent)composantModif!: ModifRandonneeComponent;
  afficherComposant : boolean = true;
  afficherAjout : boolean = false;
  afficherModif : boolean = false;

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
    this.rechargerComposant()
  }
  rechargerComposant() {
    this.listRandonnee$ = this.appeleAPI.RecupererListeRandonee();
  }

  switchAfficherAjout(){
    if(this.afficherAjout){
      this.afficherAjout = false;
      this.rechargerComposant()
    }
    else{
      this.afficherAjout = true;
    }
    
  }
  switchAfficherModif(randoneeAModif: Randonnee | null) {
    if (randoneeAModif !== null) {
      this.afficherModif = true;
      setTimeout(() => {
        if (this.composantModif) {
          this.composantModif.CreationModif(randoneeAModif);
        } else {
          console.error('ModifRandonneeComponent not initialized');
        }
      },20);
    } else {
      this.afficherModif = false;
      this.rechargerComposant();
    }
  }
}

