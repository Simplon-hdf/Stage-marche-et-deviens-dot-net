import { Component, inject } from '@angular/core';
import { ApiFetcherPossederService } from '../../services/api-fetcher-posseder.service';

@Component({
  selector: 'app-index-back-office',
  standalone: true,
  imports: [],
  templateUrl: './index-back-office.component.html',
  styleUrl: './index-back-office.component.scss'
})
export class IndexBackOfficeComponent {
  ApiFetcher = inject(ApiFetcherPossederService);
  ngOnInit(){
    this.ApiFetcher.RecupererListePossederParPublication(1).subscribe(
      result => {
        if (result) {
          console.log('Données reçues:', result);
        } else {
          console.log('Aucune donnée ou erreur');
        }
      }
    );
  }
  
}
