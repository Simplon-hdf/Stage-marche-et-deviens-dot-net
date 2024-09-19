import { ChangeDetectorRef, Component, inject, output,EventEmitter } from '@angular/core';
import { ApiFetcherPublicationService } from '../../../../../services/api-fetcher-publication.service';
import { Publication } from '../../../../../intefaces/publication';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modif-publication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modif-publication.component.html',
  styleUrl: './modif-publication.component.scss'
})
export class ModifPublicationComponent {
  appeleAPI = inject(ApiFetcherPublicationService);
  constructor(private cdr: ChangeDetectorRef){}
  idPublication:number|null = null;
  nomPublication:string = "";
  datePublication:string = "";
  lienMedia:string = "";
  contenuTexte:string = "";
  idSession:number|null = null;



  EnvoieModif(){
    let publicationAAJouter: Publication = {
      idPublication: this.idPublication,
      nomPublication: this.nomPublication,
      datePublication: this.datePublication,
      lienMedia: this.lienMedia,
      contenuTexte: this.contenuTexte,
      idSession: this.idSession 
  
    }
    this.appeleAPI.MiseAJourPublication(publicationAAJouter.idPublication!, publicationAAJouter)
      .subscribe(response => {
        console.log('Resultat mise a jour:', response);
        if(response >= 200 && response <300){
          alert("La publication a bien été modifier")
        }
      });
  }
  CreationModif(publication : Publication){
    this.idPublication = publication.idPublication;
    this.nomPublication = publication.nomPublication;
    this.datePublication = publication.datePublication;
    this.lienMedia = publication.lienMedia;
    this.contenuTexte = publication.contenuTexte;
    this.idSession = publication.idSession;
    
    this.cdr.detectChanges()
    console.log(this.idPublication);
  }
}
