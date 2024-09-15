import { NavbarComponent } from "../Components/navbar/navbar.component";
import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";     //FormsModule permet d'utiliser [(ngModel)] pour la liaison de données bidirectionnelle.
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-page-devis',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule], // liste les modules dont ce composant a besoin.
  templateUrl: './page-devis.component.html',
  styleUrls: ['./page-devis.component.scss']
})

// Cette classe comprend la logique du composant
export class PageDevisComponent  implements OnInit {

   // Propriétés   =>Les propriétés gardent une trace de l'état des selects (ouvert/fermé et valeur sélectionnée).
   isTypeGroupeOpen = false;
   isTypeProjetOpen = false;
   typeGroupeValue = '';
   typeProjetValue = '';

   
 
   // Méthodes => Les méthodes gèrent les différents événements (ouverture, fermeture, changement de valeur).
   //Elle est executé une fois pour chaque instance, au moment de la création de cette instance.
   //elle est executé apres le constructeur mais au moment de la crétion de l'instance, avant de toute creation de template...
   //c'est ici qu'on va initialiser les propiétés de notre compenent
  ngOnInit() {
    
  }


 
}