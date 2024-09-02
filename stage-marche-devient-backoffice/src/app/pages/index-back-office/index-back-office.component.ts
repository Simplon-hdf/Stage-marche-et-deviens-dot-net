import { Component, inject } from '@angular/core';
import { ApiFetcherPossederService } from '../../services/api-fetcher-posseder.service';
import { Posseder } from '../../intefaces/posseder';

@Component({
  selector: 'app-index-back-office',
  standalone: true,
  imports: [],
  templateUrl: './index-back-office.component.html',
  styleUrl: './index-back-office.component.scss'
})
export class IndexBackOfficeComponent {
  ApiFetcher = inject(ApiFetcherPossederService);
    
}
