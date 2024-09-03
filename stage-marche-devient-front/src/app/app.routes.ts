import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SejourComponent } from './Components/sejour/sejour.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent},
    { path: 'sejours', component: SejourComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
