import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout-component',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.scss',
})
export class MainLayoutComponent {
  private readonly _router = inject(Router);
  readonly authService = inject(AuthService);

  sidebarOpened = signal(true);

  logout(): void
  {
    this.authService.logout();
  }

  navigate(url: string): void
  {
    this._router.navigateByUrl(url);
  }
}
