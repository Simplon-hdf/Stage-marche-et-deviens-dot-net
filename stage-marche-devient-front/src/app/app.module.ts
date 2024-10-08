import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutesModule } from './app.routes'; // configuration avec des composants autonomes (standalone) et bootstrapApplication donc plus besoin d'importer AppRoutesModule 
import { AppComponent } from './app.component'; 
import { ConceptComponent } from './concept/concept.component';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Services/jwt.interceptor';
import { SejourComponent  } from './Components/sejour/sejour.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { CsrfInterceptor } from './Services/csrf-interceptor';



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
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, provideHttpClient(), { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }],
  
})
export class AppModule { }
