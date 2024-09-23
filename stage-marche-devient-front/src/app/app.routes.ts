import { Routes } from '@angular/router';
import { ConceptComponent } from './concept/concept.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { PageDevisComponent } from './page-devis/page-devis.component';
import { ConnexionComponent } from './Components/connexion/connexion.component';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { IndexFrontPageComponent } from './Pages/index-front-page/index-front-page.component';




export const routes: Routes = [
  { path: 'page-devis', component : PageDevisComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexFrontPageComponent },
  { path: 'concept', component: ConceptComponent },
  { path: 'randonnee/:id', component : DetailOffreComponent},
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path : 'boutonInscription', component: ReservationComponent }
  
];



export class AppRoutesModule { }
