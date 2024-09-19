import { Component, OnInit, inject } from '@angular/core';
import { ApiFetcherUtilisateurService } from '../../../../services/api-fetcher-utilisateur.service';
import { ApiFetcherSessionService } from '../../../../services/api-fetcher-session.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Session } from '../../../../intefaces/session';
import { SessionActivePipe } from '../../../../pipe/session-active.pipe';


@Component({
  selector: 'app-boite-general',
  standalone: true,
  imports: [CommonModule,SessionActivePipe],
  templateUrl: './boite-general.component.html',
  styleUrl: './boite-general.component.scss'
})
export class BoiteGeneralComponent implements OnInit {

  appelleAPIUtilisateur = inject(ApiFetcherUtilisateurService);
  appelleAPISession = inject(ApiFetcherSessionService);
  totalUtilisateur$?: Observable<number>;
  totalKmUtilisateurs$?: Observable<number>
  listeSessionActive$?: Observable<any>;
 
  ngOnInit() {
    this.totalUtilisateur$ = this.appelleAPIUtilisateur.RecupererTotalUtilisateur().pipe(
      map(response => response)
    );
    this.listeSessionActive$ = this.appelleAPISession.recupererSessionList();
    this.totalKmUtilisateurs$ = this.appelleAPIUtilisateur.RecupererTotalKms();
  }

  }