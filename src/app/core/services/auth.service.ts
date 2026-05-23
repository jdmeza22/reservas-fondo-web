import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AuthResponse } from '../models/api-response.interface';
import { LoginRequest } from '../../features/auth/interfaces/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _router = inject(Router);
  currentUser = signal<AuthResponse | null>(null);
  isAuthenticated = signal<boolean>(false);

  login(request: LoginRequest) {
    return this._http.post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/login`, request)
      .pipe(
        tap(response => {
          const auth = response.data;
          localStorage.setItem('token', auth.token);
          localStorage.setItem('user', JSON.stringify(auth));
          this.currentUser.set(auth);
          this.isAuthenticated.set(true);
          this._router.navigateByUrl('/dashboard');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this._router.navigateByUrl('/auth/login');
  }

  loadSession(): void {
    const user = localStorage.getItem('user');
    const token =localStorage.getItem('token');

    if (user && token) {
      this.currentUser.set(
        JSON.parse(user));
      this.isAuthenticated.set(true);
    }
  }
}
