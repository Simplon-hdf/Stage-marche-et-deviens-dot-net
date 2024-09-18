import { Component, OnInit } from '@angular/core';// pour définir un component et gérer son cycle de vie
import { ActivatedRoute } from '@angular/router'; // Permet d'accéder aux paramètres de la route
import { RandonneeService } from '../Services/randonnee.service'; //service pour récupérer les données de la randonnée
import { ThemeService } from '../Services/theme.service'; //service pour récupérer les données de theme
import { Randonnee } from "../Models/randonnee.model"; //modèle de données utilisé pour typer les données récupérées
import { CommonModule } from '@angular/common';
import { Theme } from '../Models/theme.model'; // pour recuperer les infos du theme et les associe à instance Randonnee

@Component({
  selector: 'app-detail-offre', // Identifie ce composant dans les templates
  standalone: true, //  composant autonome peut être utilisé indépendamment.
  imports: [CommonModule], // CommonModule fournit des fonctionnalités Angular de base comme les directives de ngIf et ngFor.
  templateUrl: './detail-offre.component.html',
  styleUrl: './detail-offre.component.scss'
})
export class DetailOffreComponent implements OnInit {
  randonnee!: Randonnee; // déclare une propriété randonnee de type Randonnee qui sera utilisée pour stocker les détails récupérés.
  theme?: Theme; // // déclare une propriété theme de type Theme qui sera utilisée pour stocker les détails récupérés.
  constructor(
    private route: ActivatedRoute, // Permet d'accéder aux paramètres de la route
    private randonneeService: RandonneeService, //  Injecte le service pour récupérer les données de randonnée
    private themeService: ThemeService //  Injecte le service pour récupérer les données de theme
  ) { }

  ngOnInit(): void {  // méthode Angular qui fait partie du cycle de vie d'un composant. Elle est appelée une fois que le composant a été initialisé. C'est ici que tu peux placer la logique de récupération de données ou d'initialisation.
    const idParam = this.route.snapshot.paramMap.get('Id_randonnee');   // extrait un paramètre de l'URL(route active) avec une récupération de la valeur ds URL
    const id = idParam !== null ? +idParam : null; // verifie si IdParam est pas null/ Si idParam a une valeur, elle est convertie en un nombre grâce au symbole + (c'est une conversion rapide d'une chaîne de caractères vers un nombre).
    //Si idParam est null la variable id est également définie sur null.
    //Cela permet de s'assurer que la variable id contient un nombre valide ou est null si le paramètre est absent.
    if (id === null || isNaN(id)) { // Cette ligne vérifie si l'ID est soit null soit non numérique ("Not a Number"). Si l'une de ces conditions est vraie ça signifie que l'ID est invalide ou manquant.
      console.error('Invalid or missing Id_randonnee parameter');
      // Gérer le cas où l'ID est manquant ou invalide. Si l'ID est absent ou incorrect cette ligne stoppe l'exécution du reste de la fonction pour éviter de continuer le traitement avec un ID invalide ou manquant.
      return; 
    }
    
    this.randonneeService.getRandonnee(id).subscribe(randonnee => { 
      this.randonnee = randonnee; //  Appelle la méthode getRandonnee du service RandonneeService pour récupérer les détails de la randonnée dont l'ID est passé en paramètre (id).
      //  La méthode subscribe est utilisée pour s'abonner au flux de données retourné par getRandonnee. Cela signifie que lorsque les données sont disponibles, la fonction passée en argument (ici, une fonction de rappel) sera exécutée. Cette fonction prend les données reçues (une instance de Randonnee) comme argument, ici nommé randonnee
      if (randonnee.theme && randonnee.theme.idTheme) { // Vérifie si l'objet randonnee contient une propriété theme et si cette propriété theme a un ID (idTheme). Cela permet de s'assurer qu'il y a bien un thème associé à la randonnée avant d'essayer de le récupérer
        this.themeService.getTheme(randonnee.theme.idTheme).subscribe(theme => { // Appelle la méthode getTheme du service ThemeService en passant l'ID du thème (randonnee.theme.idTheme). Cette méthode récupère les détails du thème correspondant à cet ID
          this.theme = theme; //Affecte l'objet theme reçu à la propriété theme du composant = met à jour les données du composant avec les informations récupérées du thème
        });
      }
    });
  }
}
