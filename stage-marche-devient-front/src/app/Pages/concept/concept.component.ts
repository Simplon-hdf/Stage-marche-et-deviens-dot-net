import { Component } from '@angular/core';
import {NavbarComponent} from "../../Components/navbar/navbar.component";

@Component({
  selector: 'app-concept',
  standalone: true,
    imports: [
        NavbarComponent
    ],
  templateUrl: './concept.component.html',
  styleUrl: './concept.component.scss'
})
export class ConceptComponent {

}
