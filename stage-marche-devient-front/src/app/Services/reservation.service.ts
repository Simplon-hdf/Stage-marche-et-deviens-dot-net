import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:7092/api/Reserver/reserver'; // URL de votre API

  constructor(private http: HttpClient) {}

  reserverRandonnee(userId: number | null, randonneeId: number | null, places: number) {
    const body = { userId, randonneeId, places };
    return this.http.post(`${this.apiUrl}/reserver`, body);
  }
}
