import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {RandonneeService} from "../../Services/randonnee.service";
import {Randonnee} from "../../Models/randonnee.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-card-sejour',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
  ],
  templateUrl: './card-sejour.component.html',
  styleUrl: './card-sejour.component.scss'
})
export class CardSejourComponent implements OnInit{
  randos: Randonnee[] = [];
  error: string = " ";

  constructor(private randonneeService: RandonneeService) {}

  ngOnInit(): void {
    this.loadRandonnee();
  }

  loadRandonnee(): void {
    this.randonneeService.getRandos().subscribe({
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
