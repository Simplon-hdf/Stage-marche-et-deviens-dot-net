import { Component, inject, OnInit } from '@angular/core';
import { Utilisateur } from '../../../../intefaces/utilisateur';
import { ApiFetcherUtilisateurService } from '../../../../services/api-fetcher-utilisateur.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boite-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boite-utilisateur.component.html',
  styleUrl: './boite-utilisateur.component.scss'
})
export class BoiteUtilisateurComponent implements OnInit {
  afficherComposant: boolean = true;
  afficherAjout: boolean = false;
  appeleAPI = inject(ApiFetcherUtilisateurService);
  public listUtilisateur$: Observable<Utilisateur[]> = this.appeleAPI.RecupererListeUtilisitateur();

  utilisateursFiltres$!: Observable<Utilisateur[]>;
  searchTerm: string = '';

  ngOnInit() {
    this.utilisateursFiltres$ = this.listUtilisateur$;
  }

  suppression(id: number, nomUtilisateur: string) {
    if (confirm(`Est-tu sûr de vouloir supprimer l'utilisateur du nom de : ${nomUtilisateur}`)) {
      this.appeleAPI.SupressionUtilisitateur(id).subscribe({
        next: (resultat) => {
          alert("" + resultat);
          this.rechargerComposant();
        }
      });
    }
  }

  rechargerComposant() {
    this.listUtilisateur$ = this.appeleAPI.RecupererListeUtilisitateur();
    this.utilisateursFiltres$ = this.listUtilisateur$;
  }

  filtrerUtilisateursParNom(nomRecherche: string): Observable<Utilisateur[]> {
    return this.listUtilisateur$.pipe(
      map(utilisateurs => utilisateurs.filter(utilisateur => 
        utilisateur.nomUtilisateur.toLowerCase().includes(nomRecherche.toLowerCase()) ||
        utilisateur.prenomUtilisateur.toLowerCase().includes(nomRecherche.toLowerCase())
      ))
    );
  }

  onSearchChange() {
    this.utilisateursFiltres$ = this.filtrerUtilisateursParNom(this.searchTerm);
  }
}