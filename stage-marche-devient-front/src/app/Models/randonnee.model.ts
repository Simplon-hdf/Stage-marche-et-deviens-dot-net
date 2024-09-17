// Model des Randonnées.
export class Randonnee {
  idRandonnee?: number;
  nomRandonnee?: string;
  descriptionRandonnee?: string;
  lieuRandonnee?: string;
  imageRandonnee?: string;
  prixRandonnee?: number;
  nbrNuitRandonnee?: number;
  minimumParticipant?: number;
  maximumParticipant?: number;
  estVisible: boolean = true;
  distanceKmRandonnee?: number;
  theme?: Theme; // je dois inclure cette propriété dans Randonnee pour représenter la relation entre une randonnée et un thème.
}

export class Theme {
  idTheme?: number;
  nomTheme?: string;
}