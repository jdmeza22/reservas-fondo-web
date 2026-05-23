import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { AUTH_TEXTS, APP_TEXTS } from '../../../../core/constants/text';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);
  readonly authTexts = AUTH_TEXTS;
  readonly appTexts = APP_TEXTS;
  hidePassword =  signal(true);
  loading = signal(false);


  loginForm =
    this._formBuilder.nonNullable.group(
      {correo: ['',[ Validators.required,Validators.email] ],
       password: ['', [  Validators.required ] ]
    });

  onSubmit(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched() ; return;}

    this.loading.set(true);

    this._authService
      .login(this.loginForm.getRawValue())
      .pipe(
        finalize(() =>
          this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this._snackBar.open('Bienvenido al sistema', 'Cerrar',
            {
              duration: 3000
            });
        },

        error: (error) => {
          this._snackBar.open(
            error.error.message ??'Error al iniciar sesión', 'Cerrar',
            {
              duration: 4000
            });
        }
      });
  }
}
