import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./Components/navbar/navbar.component";
import { SejourComponent } from './Components/sejour/sejour.component';
import { ConceptComponent } from './concept/concept.component'; 
import { CommonModule } from '@angular/common';
import { CsrfService } from './Services/api/csrf.service';
import { PageDevisComponent } from './page-devis/page-devis.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterModule, RouterOutlet, NavbarComponent, SejourComponent, ConceptComponent,PageDevisComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stage-marche-devient-front';
  constructor(private csrfService: CsrfService) {}
  ngOnInit() {
    // Récupération et stockage du token CSRF lors du démarrage de l'application
    this.csrfService.getCsrfToken().subscribe((response: any) => {
      localStorage.setItem('XSRF-TOKEN', response.token); // Stocker le token dans localStorage
    });
  }
}
