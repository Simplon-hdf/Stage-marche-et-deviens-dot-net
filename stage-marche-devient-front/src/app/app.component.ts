import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./Components/navbar/navbar.component";
import {CardSejourComponent} from "./Components/card-sejour/card-sejour.component";
import { ConceptComponent } from './concept/concept.component'; 

@Component({
  selector: 'app-root',
  //standalone: true,//
    //imports: [RouterOutlet, NavbarComponent, CardSejourComponent, ConceptComponent],//
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stage-marche-devient-front';
}
