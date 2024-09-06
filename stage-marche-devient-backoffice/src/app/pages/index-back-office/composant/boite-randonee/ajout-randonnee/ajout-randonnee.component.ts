import { Component, inject } from '@angular/core';
import { Randonnee } from '../../../../../intefaces/randonnee';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ApiFetcherRandoneeService } from '../../../../../services/api-fetcher-randonee.service';

@Component({
  selector: 'app-ajout-randonnee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajout-randonnee.component.html',
  styleUrl: './ajout-randonnee.component.scss'
})
export class AjoutRandonneeComponent {
  appeleAPI = inject(ApiFetcherRandoneeService);
  constructor(){}

  idRandonne = null;
  nomRandonne = "";
  descriptionRandonne = "";
  lieuRandonne = "";
  imageRandonne = "";
  prixRandonne = 0;
  nbrNuitRandonne = 0;
  minimumParticipan = 0;
  maximumParticipan = 0;
  estVisibl = true;
  distanceKmRandonne = 0;
  
  EnvoieAjout(){
    let randonneeAAJouter: Randonnee = {
      idRandonnee: this.idRandonne,
      nomRandonnee: this.nomRandonne,
      descriptionRandonnee: this.descriptionRandonne,
      lieuRandonnee: this.lieuRandonne,
      imageRandonnee: this.imageRandonne,
      prixRandonnee: this.prixRandonne,
      nbrNuitRandonnee: this.nbrNuitRandonne,
      minimumParticipant: this.minimumParticipan,
      maximumParticipant: this.maximumParticipan,
      estVisible: this.estVisibl,
      distanceKmRandonnee: this.distanceKmRandonne,
  
    }
    this.appeleAPI.AjouterRandonnee(randonneeAAJouter).subscribe();
  }
}
