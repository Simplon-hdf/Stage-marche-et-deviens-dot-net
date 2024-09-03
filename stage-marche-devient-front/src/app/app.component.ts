import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./Components/navbar/navbar.component";
import { SejourComponent } from './Components/sejour/sejour.component';
import { ConceptComponent } from './concept/concept.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, NavbarComponent, SejourComponent, ConceptComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stage-marche-devient-front';
}
