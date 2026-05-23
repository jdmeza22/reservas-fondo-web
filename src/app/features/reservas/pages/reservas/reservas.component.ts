import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReservaService } from '../../../../core/services/reserva.service';
import { Reserva } from '../../models/reserva.interface';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Reservas {
  private readonly _fb = inject(FormBuilder);
  private readonly _reservaService = inject(ReservaService);
  private readonly _snackBar = inject(MatSnackBar);

  reservas = signal<Reserva[]>([]);
  loading = signal(false);
  creating = signal(false);

  private formatForInput(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  reservaForm = this._fb.nonNullable.group({
    fecha: [this.formatForInput(new Date()), [Validators.required]],
    descripcion: ['', [Validators.required]],
    monto: [0, [Validators.required]]
  });

  constructor() {
    this.loadReservas();
  }

  loadReservas(): void {
    this.loading.set(true);
    this._reservaService.getMisReservas().subscribe({
      next: (resp) => {
        this.reservas.set(resp.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this._snackBar.open('Error cargando reservas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) { this.reservaForm.markAllAsTouched(); return; }
    this.creating.set(true);
    const payload = this.reservaForm.getRawValue();
    this._reservaService.crearReserva(payload).subscribe({
      next: (resp) => {
        const created = resp.data;
        this.reservas.update(list => [created, ...list]);
        this.reservaForm.reset({fecha: this.formatForInput(new Date()), descripcion: '', monto: 0});
        this._snackBar.open('Reserva creada', 'Cerrar', { duration: 3000 });
        this.creating.set(false);
      },
      error: (err) => {
        this.creating.set(false);
        this._snackBar.open(err?.error?.message ?? 'Error creando reserva', 'Cerrar', { duration: 4000 });
      }
    });
  }
}
