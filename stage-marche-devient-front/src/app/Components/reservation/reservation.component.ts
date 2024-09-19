import { Component } from '@angular/core';
import { ConnexionService } from "../../Services/connexion.service";  // Service pour récupérer l'utilisateur connecté
import { RandonneeService } from '../../Services/randonnee.service';  // Service pour récupérer l'ID de la randonnée
import { ReservationService } from '../../Services/reservation.service'; // Service pour effectuer la réservation


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  userId: number | null;
  randonneeId: number | null;
  places: number = 1;  // Nombre de places à réserver, par défaut 1

  constructor(
    private connexionService: ConnexionService,
    private randonneeService: RandonneeService,
    private reservationService: ReservationService
  ) {
    // Récupérer l'ID de l'utilisateur connecté et l'ID de la randonnée
    this.userId = this.connexionService.getUserId();
    this.randonneeId = this.randonneeService.getRandonneeId();
  }

  reserver() {
    // Appel au service de réservation
    this.reservationService.reserverRandonnee(this.userId, this.randonneeId, this.places)
      .subscribe((response) => {
        console.log('Réservation réussie : ', response);
      }, (error) => {
        console.error('Erreur lors de la réservation : ', error);
      });
}
}