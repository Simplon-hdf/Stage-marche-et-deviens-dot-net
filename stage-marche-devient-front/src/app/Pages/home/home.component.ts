import { Component } from '@angular/core';
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {SejourComponent} from "../../Components/sejour/sejour.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        NavbarComponent,
        SejourComponent,
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
