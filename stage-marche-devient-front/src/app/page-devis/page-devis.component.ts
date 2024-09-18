import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { DevisService } from '../Services/devis.service';
import { HttpClient } from '@angular/common/http';
import { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-page-devis',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './page-devis.component.html',
  styleUrls: ['./page-devis.component.scss']
})
export class PageDevisComponent implements OnInit, AfterViewInit {
  @ViewChild('devisForm') devisForm!: ElementRef;

  constructor(private devisService: DevisService, private http: HttpClient) {}

  isTypeGroupeOpenState = false;
  isTypeProjetOpenState = false;
  typeGroupeValue = '';
  typeProjetValue = '';


  // Méthodes => Les méthodes gèrent les différents événements (ouverture, fermeture, changement de valeur).
  openTypeGroupe() {
   this.isTypeGroupeOpenState = true;
 }

 closeTypeGroupe() {
   this.isTypeGroupeOpenState = false;
 }

 changeTypeGroupe(event: any) {
   this.typeGroupeValue = event.target.value;
 }

 openTypeProjet() {
   this.isTypeProjetOpenState = true;
 }

   closeTypeProjet() {
    this.isTypeProjetOpenState = false;
  }

  changeTypeProjet(event: any) {
    this.typeProjetValue = event.target.value;
  }

  ngOnInit() {
    console.log('Composant initialisé');
    this.getCsrfToken();

  }

  ngAfterViewInit() {
    if (this.devisForm) {
      console.log('Formulaire trouvé:', this.devisForm);
    } else {
      console.error('Formulaire non trouvé');
    }
  }

  getCsrfToken() {
    this.http.get('http://localhost:4200/api/csrf-token', { responseType: 'text' }).subscribe(
      response => {
        try {
          const jsonResponse = JSON.parse(response);
          console.log('Token CSRF obtenu:', jsonResponse);
        } catch (error) {
          console.error('Erreur lors du parsing de la réponse CSRF:', error);
          console.log('Réponse brute:', response);
        }
      },
      error => {
        console.error('Erreur lors de la requête CSRF:', error);
      }
    );
  }

  onSubmit() {
    const form = this.devisForm.nativeElement;
    console.log('onSubmit appelé');
    if (form) {
      console.log('Formulaire valide:', form.checkValidity());
      console.log('Valeurs du formulaire:', new FormData(form));
      if (form.checkValidity()) {
        this.devisService.sendEmail(form)
        .then((value: Object | undefined) => {
          const result = value as EmailJSResponseStatus;
          console.log('EmailJS result:', result.text);
            alert('Email envoyé avec succès!');
          })
          .catch((error: any) => {
            console.log('EmailJS error:', error);
            alert('Erreur lors de l\'envoi de l\'email.');
          });
      } else {
        alert('Veuillez remplir tous les champs requis.');
      }
    } else {
      console.error('Formulaire non trouvé');
    }
  }
}
