import { Component, inject } from '@angular/core';
import { Publication } from '../../../../../intefaces/publication';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ApiFetcherPublicationService } from '../../../../../services/api-fetcher-publication.service';


@Component({
  selector: 'app-ajout-publication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajout-publication.component.html',
  styleUrl: './ajout-publication.component.scss'
})
export class AjoutPublicationComponent {

  appeleAPI = inject(ApiFetcherPublicationService);
  constructor(){}

  idPublication = null;
  nomPublication = "";
  datePublication = "";
  lienMedia = "";
  contenuTexte = "";
  idSession = null;
  
  EnvoieAjout(){
    let publicationAAJouter: Publication = {
      idPublication: this.idPublication,
      nomPublication: this.nomPublication,
      datePublication: this.datePublication,
      lienMedia: this.lienMedia,
      contenuTexte: this.contenuTexte,
      idSession: this.idSession  
    }
    this.appeleAPI.AjouterPublication(publicationAAJouter).subscribe();
    alert(`randonnée du non de ${publicationAAJouter.nomPublication} a été crée`)
  }
}
