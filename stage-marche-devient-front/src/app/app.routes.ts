import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardSejourComponent } from './Components/card-sejour/card-sejour.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent},
    { path: 'sejours', component: CardSejourComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
