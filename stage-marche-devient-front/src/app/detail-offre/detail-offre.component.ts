import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RandonneeService } from '../services/randonnee.service';
import { Randonnee } from "../Models/randonnee.model";

@Component({
  selector: 'app-detail-offre',
  standalone: true,
  imports: [],
  templateUrl: './detail-offre.component.html',
  styleUrl: './detail-offre.component.scss'
})
export class DetailOffreComponent implements OnInit {
  randonnee: Randonnee;

  constructor(
    private route: ActivatedRoute,
    private randonneeService: RandonneeService
  ) { }

  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('Id_randonnee');
    this.randonneeService.getRandonnee(id).subscribe(randonnee => {
      this.randonnee = randonnee;
    });
  }
}
