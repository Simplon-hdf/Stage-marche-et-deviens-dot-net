import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserRegister } from '../Models/insc.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:5001/Inscription';

  constructor(private http: HttpClient) { }

  register(user: UserRegister): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwt_token', response.token);
        }
      })
    );
  }
}