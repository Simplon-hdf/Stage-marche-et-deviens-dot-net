import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component'; 
import { ConceptComponent } from './concept/concept.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CardSejourComponent  } from './Components/card-sejour/card-sejour.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';


@NgModule({
  declarations: [
     AppComponent,
  
    // Ajoutez d'autres composants ici
  ],
  imports: [
   
    ConceptComponent,
    NavbarComponent,
    CommonModule,
    CardSejourComponent,
    BrowserModule,
    AppRoutingModule // Importation du module de routage
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, provideHttpClient()],
  bootstrap: [AppComponent] // Définir le composant racine
})
export class AppModule { }
