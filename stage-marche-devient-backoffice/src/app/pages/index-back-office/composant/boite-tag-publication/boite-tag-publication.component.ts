import { Component, inject, OnInit } from '@angular/core';
import { TagPublication } from '../../../../intefaces/tag-publication';
import { ApiFetcherTagPublicationService } from '../../../../services/api-fetcher-tag-publication.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjoutTagPublicationComponent } from './ajout-tag-publication/ajout-tag-publication.component';
import { ModifTagPublicationComponent } from './modif-tag-publication/modif-tag-publication.component';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-boite-tag-publication',
  standalone: true,
  imports: [CommonModule, FormsModule, AjoutTagPublicationComponent, ModifTagPublicationComponent],
  templateUrl: './boite-tag-publication.component.html',
  styleUrl: './boite-tag-publication.component.scss'
})
export class BoiteTagPublicationComponent {

@ViewChild(ModifTagPublicationComponent)composantModif!: ModifTagPublicationComponent;
  afficherComposant : boolean = true;
  afficherAjout : boolean = false;
  afficherModif : boolean = false;
  
  appeleAPI = inject(ApiFetcherTagPublicationService);
  public listTagPublication$:Observable<TagPublication[]> = this.appeleAPI.recupererTagPublicationList();

  tagPublicationsFiltres$!: Observable<TagPublication[]>;
  searchTerm: string = '';

  ngOnInit(){
    this.tagPublicationsFiltres$ = this.listTagPublication$;

  }

  suppression(id:number, nomRandonnee: string){
    if(confirm(`Est-tu sur de vouloir suprimer la randonnée du nom de :${nomRandonnee}`)){
      this.appeleAPI.SupressionTegPublication(id).subscribe({
        next: (resultat) =>{
          alert("" + resultat)
          this.rechargerComposant();
        }
      }); 
    }
  }
  
  rechargerComposant() {
    this.listTagPublication$ = this.appeleAPI.recupererTagPublicationList();
    this.tagPublicationsFiltres$ = this.listTagPublication$;
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

  switchAfficherModif(tagPublicationAModif: TagPublication | null) {
    if (tagPublicationAModif !== null) {
      this.afficherModif = true;
      setTimeout(() => {
        if (this.composantModif) {
          this.composantModif.CreationModif(tagPublicationAModif);
        } else {
          console.error('ModifPublicationComponent not initialized');
        }
      },20);
    } else {
      this.afficherModif = false;
      this.rechargerComposant();
    }
  }
  
  filtrerPublicationsParNom(nomRecherche: string): Observable<TagPublication[]> {
    return this.listTagPublication$.pipe(
      map(tagPublications => tagPublications.filter(tagPublications => 
        tagPublications.nom.toLowerCase().includes(nomRecherche.toLowerCase())))
    );
  }

  onSearchChange() {
    this.tagPublicationsFiltres$ = this.filtrerPublicationsParNom(this.searchTerm);
  }

  // selecteurBoite = inject(SelecteurBoiteCommandeAdminService);

  // SelectionBoiteTag(){
  //   this.selecteurBoite.choixPanelCommande("tag-publication");
  // }
}
