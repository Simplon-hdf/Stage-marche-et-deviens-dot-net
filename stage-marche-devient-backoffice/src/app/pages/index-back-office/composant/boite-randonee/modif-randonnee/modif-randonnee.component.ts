import { ChangeDetectorRef, Component, inject, output,EventEmitter } from '@angular/core';
import { ApiFetcherRandoneeService } from '../../../../../services/api-fetcher-randonee.service';
import { Randonnee } from '../../../../../intefaces/randonnee';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modif-randonnee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modif-randonnee.component.html',
  styleUrl: './modif-randonnee.component.scss'
})
export class ModifRandonneeComponent {
  appeleAPI = inject(ApiFetcherRandoneeService);
  constructor(private cdr: ChangeDetectorRef){}
  idRandonne:number|null = null;
  nomRandonne:string = "";
  descriptionRandonne:string = "";
  lieuRandonne:string = "";
  imageRandonne:string = "";
  prixRandonne:number = 0;
  nbrNuitRandonne:number = 0;
  minimumParticipan:number = 0;
  maximumParticipan:number = 0;
  estVisibl:boolean = true;
  distanceKmRandonne:number = 0;
  
  EnvoieModif(){
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
    this.appeleAPI.MiseAJourRandonnee(randonneeAAJouter.idRandonnee!, randonneeAAJouter)
      .subscribe(response => {
        console.log('Resultat mise a jour:', response);
        if(response >= 200 && response <300){
          alert("La randonnée a bien été modifier")
        }
      });
  }
  CreationModif(randonnee : Randonnee){
    this.idRandonne = randonnee.idRandonnee;
    this.nomRandonne = randonnee.nomRandonnee;
    this.descriptionRandonne = randonnee.descriptionRandonnee;
    this.lieuRandonne = randonnee.lieuRandonnee;
    this.imageRandonne = randonnee.imageRandonnee;
    this.prixRandonne = randonnee.prixRandonnee;
    this.nbrNuitRandonne = randonnee.nbrNuitRandonnee;
    this.minimumParticipan = randonnee.minimumParticipant;
    this.maximumParticipan = randonnee.maximumParticipant;
    this.estVisibl = randonnee.estVisible;
    this.distanceKmRandonne = randonnee.distanceKmRandonnee;
    this.cdr.detectChanges()
    console.log(this.idRandonne);
  }
}