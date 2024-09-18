/*import { NgModule } from '@angular/core';*/ //suppression NgModule et RouterModule car utilisation de composants standalone
// et de bootstrapplication avec provideRouter.
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConceptComponent } from './concept/concept.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { InscriptionComponent } from './Components/inscription/inscription.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'concept', component: ConceptComponent },
  { path: 'randonnee/:id', component : DetailOffreComponent},
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent }
  
];



export class AppRoutesModule { }
