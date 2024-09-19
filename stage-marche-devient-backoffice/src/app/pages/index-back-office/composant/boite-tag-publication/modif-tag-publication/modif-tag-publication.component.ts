import { ChangeDetectorRef, Component, inject, output,EventEmitter } from '@angular/core';
import { ApiFetcherTagPublicationService } from '../../../../../services/api-fetcher-tag-publication.service';
import { TagPublication } from '../../../../../intefaces/tag-publication';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modif-tag-publication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modif-tag-publication.component.html',
  styleUrl: './modif-tag-publication.component.scss'
})
export class ModifTagPublicationComponent {

  appeleAPI = inject(ApiFetcherTagPublicationService);
  constructor(private cdr: ChangeDetectorRef){}
  idTagPublication:number|null = null;
  nom:string = "";
  couleur:string = "";




  EnvoieModif(){
    let publicationAAJouter: TagPublication = {
      idTagPublication: this.idTagPublication,
      nom: this.nom,
      couleur: this.couleur,
  
    }
    this.appeleAPI.MiseAJourTagPublication(publicationAAJouter.idTagPublication!, publicationAAJouter)
      .subscribe(response => {
        console.log('Resultat mise a jour:', response);
        if(response >= 200 && response <300){
          alert("La publication a bien été modifier")
        }
      });
  }
  CreationModif(publication : TagPublication){
    this.idTagPublication = publication.idTagPublication;
    this.nom = publication.nom;
    this.couleur = publication.couleur;

    
    this.cdr.detectChanges()
    console.log(this.idTagPublication);
  }
}
