import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = localStorage.getItem('XSRF-TOKEN'); // Récupérer le token CSRF depuis le localStorage

    if (csrfToken) {
      // Cloner la requête et y ajouter l'en-tête CSRF
      const cloned = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', csrfToken)
      });
      return next.handle(cloned); // Envoyer la requête clonée avec le token
    } else {
      return next.handle(req); // Si pas de token, continuer sans modifier la requête
    }
  }
}
