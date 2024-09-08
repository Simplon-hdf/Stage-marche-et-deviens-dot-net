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
}
