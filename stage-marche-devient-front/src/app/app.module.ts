import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { ConceptComponent } from "./Pages/concept/concept.component";
import { provideHttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { SejourComponent } from "./Components/sejour/sejour.component";
import { HomeComponent } from "./Pages/home/home.component";

@NgModule({
  declarations: [
    // Ajoutez d'autres composants ici
  ],
  imports: [
    HomeComponent,
    ConceptComponent,
    NavbarComponent,
    CommonModule,
    SejourComponent,
    BrowserModule,
    AppRoutingModule, // Importation du module de routage
  ],
  providers: [provideHttpClient()],
  bootstrap: [], // Définir le composant racine
})
export class AppModule {}
