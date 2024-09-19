import { Component, inject } from '@angular/core';
import { Publication } from '../../../../../intefaces/publication';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ApiFetcherTagPublicationService } from '../../../../../services/api-fetcher-tag-publication.service';
import { TagPublication } from '../../../../../intefaces/tag-publication';

@Component({
  selector: 'app-ajout-tag-publication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajout-tag-publication.component.html',
  styleUrl: './ajout-tag-publication.component.scss'
})
export class AjoutTagPublicationComponent {

  appeleAPI = inject(ApiFetcherTagPublicationService);
  constructor(){}

  idTagPublication = null;
  nom = "";
  couleur = "";
  
  EnvoieAjout(){
    let tagAAjouter: TagPublication = {
      idTagPublication: this.idTagPublication,
      nom: this.nom,
      couleur: this.couleur,

    }
    this.appeleAPI.AjouterTagPublication(tagAAjouter).subscribe();
    alert(`randonnée du non de ${tagAAjouter.nom} a été crée`)
  }
}
