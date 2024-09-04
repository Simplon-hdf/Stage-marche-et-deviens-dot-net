import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {RandonneeService} from "../../Services/randonnee.service";
import {Randonnee} from "../../Models/randonnee.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sejour',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './sejour.component.html',
  styleUrl: './sejour.component.scss'
})

export class SejourComponent implements OnInit{
  randos: Randonnee[] = [];
  error: string = " ";

  constructor(private randonneeService: RandonneeService) {} // Import de RandonneService.

  // Permet de lancer la fonction loadRoandonnee() des le chargement de la page.
  ngOnInit(): void {
    this.loadRandonnee();
  }

  // Fonction qui permet de récupérer les randos.
  loadRandonnee(): void {
    this.randonneeService.getRandos().subscribe({ // Appel de la fonction getRandos().
      next: (data) => {
        this.randos = data;
        console.log('Randonnées chargées:', this.randos);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des randonnées';
        console.error('Erreur:', err);
      }
    });
  }
}