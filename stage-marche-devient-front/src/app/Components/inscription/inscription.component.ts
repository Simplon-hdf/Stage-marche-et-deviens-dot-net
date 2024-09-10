import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRegister } from '../../Models/insc.model';
import { RegisterService } from '../../Services/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private registerSubscription: Subscription | null = null;
  private router = inject(Router);

  registerFormGroup = this.formBuilder.group({
    nomUtilisateur: ['', Validators.required],
    prenomUtilisateur: ['', Validators.required],
    telUtilisateur: ['', Validators.required],
    mailUtilisateur: ['', Validators.required],
    mdpUtilisateur: ['', Validators.required],
  });

  register() {
    if (this.registerFormGroup.valid) {
      const userRegister: UserRegister = this.registerFormGroup.value as UserRegister;
      if (!userRegister.mailUtilisateur || userRegister.mailUtilisateur.trim() === '') {
        console.error('L\'email ne peut pas être vide');
        // Afficher un message d'erreur à l'utilisateur
        return;
      }
      this.registerSubscription = this.registerService
        .register(userRegister)
        .subscribe({
          next: (response: any) => {
            console.log('Inscription réussie:', response);
            this.router.navigate(['home']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erreur d\'inscription:', error);
            if (error.error instanceof ErrorEvent) {
              console.error('Erreur côté client:', error.error.message);
            } else {
              console.error(`Erreur ${error.status} du serveur:`, error.error);
            }
            // Afficher un message d'erreur à l'utilisateur
          },
        });
    } else {
      console.log('Formulaire invalide');
      Object.values(this.registerFormGroup.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  ngOnDestroy() {
    this.registerSubscription?.unsubscribe();
  }
}
