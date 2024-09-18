import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';//grisé car pas utilisé ici mais déjà inclus dans appConfig donc déjà intégrées via appConfig.
import { routes } from './app/app.routes';// idem pour routes déjà inclus dans appConfig
import {appConfig} from "./app/app.config";

bootstrapApplication(AppComponent, appConfig )
  .catch(err => console.error(err));
