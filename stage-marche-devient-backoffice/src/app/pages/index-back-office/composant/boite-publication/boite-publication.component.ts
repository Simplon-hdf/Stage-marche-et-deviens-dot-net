import { Component, inject, OnInit } from '@angular/core';
import { Publication } from '../../../../intefaces/publication';
import { ApiFetcherPublicationService } from '../../../../services/api-fetcher-publication.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjoutPublicationComponent } from './ajout-publication/ajout-publication.component';
import { ModifPublicationComponent } from './modif-publication/modif-publication.component';
import { ViewChild } from '@angular/core';

import { SelecteurBoiteCommandeAdminService } from '../../service/selecteur-boite-commande-admin.service';


@Component({
  selector: 'app-boite-publication',
  standalone: true,
  imports: [CommonModule,AjoutPublicationComponent, ModifPublicationComponent, FormsModule],
  templateUrl: './boite-publication.component.html',
  styleUrl: './boite-publication.component.scss'
})
export class BoitePublicationComponent implements OnInit {

  @ViewChild(ModifPublicationComponent)composantModif!: ModifPublicationComponent;
  afficherComposant : boolean = true;
  afficherAjout : boolean = false;
  afficherModif : boolean = false;
  
  appeleAPI = inject(ApiFetcherPublicationService);
  public listPublication$:Observable<Publication[]> = this.appeleAPI.recupererPublicationList();

  publicationsFiltres$!: Observable<Publication[]>;
  searchTerm: string = '';

  ngOnInit(){
    this.publicationsFiltres$ = this.listPublication$;

  }

  suppression(id:number, nomRandonnee: string){
    if(confirm(`Est-tu sur de vouloir suprimer la randonnée du nom de :${nomRandonnee}`)){
      this.appeleAPI.SupressionPublication(id).subscribe({
        next: (resultat) =>{
          alert("" + resultat)
          this.rechargerComposant();
        }
      }); 
    }
  }
  
  rechargerComposant() {
    this.listPublication$ = this.appeleAPI.recupererPublicationList();
    this.publicationsFiltres$ = this.listPublication$;
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
  switchAfficherModif(publicationAModif: Publication | null) {
    if (publicationAModif !== null) {
      this.afficherModif = true;
      setTimeout(() => {
        if (this.composantModif) {
          this.composantModif.CreationModif(publicationAModif);
        } else {
          console.error('ModifPublicationComponent not initialized');
        }
      },20);
    } else {
      this.afficherModif = false;
      this.rechargerComposant();
    }
  }
  
  filtrerPublicationsParNom(nomRecherche: string): Observable<Publication[]> {
    return this.listPublication$.pipe(
      map(publications => publications.filter(publication => 
        publication.nomPublication.toLowerCase().includes(nomRecherche.toLowerCase())))
    );
  }

  onSearchChange() {
    this.publicationsFiltres$ = this.filtrerPublicationsParNom(this.searchTerm);
  }

  selecteurBoite = inject(SelecteurBoiteCommandeAdminService);

  SelectionBoiteTag(){
    this.selecteurBoite.choixPanelCommande("tag-publication");
  }
}
