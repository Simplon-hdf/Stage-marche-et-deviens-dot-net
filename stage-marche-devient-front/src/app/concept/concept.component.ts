import { Component,} from '@angular/core';
import { NavbarComponent } from "../Components/navbar/navbar.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-concept',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
  
})
export class ConceptComponent {

}
