import { Component, inject, OnDestroy } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConnexionService } from "../../Services/connexion.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserCredentials } from "../../Models/auth.model";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-connexion",
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: "./connexion.component.html",
  styleUrl: "./connexion.component.scss",
})
export class ConnexionComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(ConnexionService);
  private router = inject(Router);
  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    mailUtilisateur: ["", [Validators.required]],
    motDePasse: ["", [Validators.required]],
  });
  invalidCredentials = false;

  login() {
    this.loginSubscription = this.loginService
      .login(this.loginFormGroup.value as UserCredentials)
      .subscribe({
        next: (result) => {
          this.router.navigate(["home"]);
        },
        error: (error) => {
          this.invalidCredentials = true;
        },
      });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
