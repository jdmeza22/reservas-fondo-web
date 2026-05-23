import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  private readonly _authService = inject(AuthService);
  protected readonly title = signal('reservas-fondo-web');

  constructor()
  {
    this._authService.loadSession();
  }
}
