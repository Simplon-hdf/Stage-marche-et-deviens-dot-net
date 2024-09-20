import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { SejourComponent } from '../../Components/sejour/sejour.component';

@Component({
  selector: 'app-index-front-page',
  standalone: true,
  imports: [NavbarComponent, SejourComponent,RouterLink],
  templateUrl: './index-front-page.component.html',
  styleUrl: './index-front-page.component.scss'
})
export class IndexFrontPageComponent {

}
