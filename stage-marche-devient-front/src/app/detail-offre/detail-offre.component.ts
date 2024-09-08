import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RandonneeService } from '../Services/randonnee.service';
import { Randonnee } from "../Models/randonnee.model";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-offre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-offre.component.html',
  styleUrl: './detail-offre.component.scss'
})
export class DetailOffreComponent implements OnInit {
  randonnee!: Randonnee;

  constructor(
    private route: ActivatedRoute,
    private randonneeService: RandonneeService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('Id_randonnee');
    const id = idParam !== null ? +idParam : null;
    if (id === null || isNaN(id)) {
      console.error('Invalid or missing Id_randonnee parameter');
      // Gérer le cas où l'ID est manquant ou invalide
      return;
    }
    
    this.randonneeService.getRandonnee(id).subscribe(randonnee => {
      this.randonnee = randonnee;
    });
  }
}
