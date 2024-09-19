import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';


@Injectable({
  providedIn: 'root'
})
export class DevisService {

  constructor(private http: HttpClient) { }

  sendEmail(form: any) {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    const body = {
      service_id: 'service_8g0p9jq',
      template_id: 'template_9120kbr',
      user_id: 'oZnsAVS2BAe3_IBTh',
      template_params: {
        'user_name': form.Nom,
        'user_email': form.Email,
        'message': form.Informations
      }
    };

    return this.http.post(url, body, { headers }).toPromise();
  }
}