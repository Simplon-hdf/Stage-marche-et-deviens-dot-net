import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./Components/navbar/navbar.component";
import { SejourComponent } from './Components/sejour/sejour.component';
import { ConceptComponent } from './concept/concept.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterModule, RouterOutlet, NavbarComponent, SejourComponent, ConceptComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stage-marche-devient-front';
}
