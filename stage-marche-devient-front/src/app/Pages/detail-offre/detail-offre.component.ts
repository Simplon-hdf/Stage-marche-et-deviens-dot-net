import { Component, OnInit } from '@angular/core';
import { DetailsOffreService } from '../../Services/details-offre.service';
import { NavbarComponent } from "../../Components/navbar/navbar.component";

@Component({
  selector: 'app-detail-offre',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './detail-offre.component.html',
  styleUrl: './detail-offre.component.scss'
})
export class DetailOffreComponent  implements OnInit {
  programData: any = {};

  constructor(private detailsOffreService: DetailsOffreService) { }

  ngOnInit(): void {
    this.detailsOffreService.getProgramData().subscribe(
      data => {
        this.programData = data;
      },
      error => {
        console.error('Error fetching program data', error);
      }
    );
  }
}
