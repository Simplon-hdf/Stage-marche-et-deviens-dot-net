import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexBackOfficeComponent } from "./pages/index-back-office/index-back-office.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexBackOfficeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stage-marche-devient-backoffice';
}
