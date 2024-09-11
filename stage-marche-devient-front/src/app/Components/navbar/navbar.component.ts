import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnexionService } from '../../Services/connexion.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  conService = inject(ConnexionService);
}
