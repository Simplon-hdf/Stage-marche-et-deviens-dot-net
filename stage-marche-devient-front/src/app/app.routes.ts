import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConceptComponent } from "./Pages/concept/concept.component";
import { HomeComponent } from "./Pages/home/home.component";
import { DetailOffreComponent } from "./Pages/detail-offre/detail-offre.component";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "concept", component: ConceptComponent },
  { path: "detail-offre", component: DetailOffreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
