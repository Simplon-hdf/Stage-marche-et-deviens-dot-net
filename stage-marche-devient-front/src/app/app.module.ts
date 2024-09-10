import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutesModule } from './app.routes';
import { AppComponent } from './app.component'; 
import { ConceptComponent } from './concept/concept.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CardSejourComponent  } from './Components/card-sejour/card-sejour.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { SejourComponent  } from './Components/sejour/sejour.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';



@NgModule({
  declarations: [
     
     
     
  
     
  
    // Ajoutez d'autres composants ici
  ],
  imports: [
    NavbarComponent,
    AppComponent,
    ConceptComponent,
    DetailOffreComponent,
    SejourComponent,
    BrowserModule,
    AppRoutesModule // Importation du module de routage
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, provideHttpClient()],
  bootstrap: [AppComponent] // Définir le composant racine
  providers: [provideHttpClient()],
  bootstrap: [] // Définir le composant racine
})
export class AppModule { }
