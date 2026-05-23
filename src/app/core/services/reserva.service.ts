import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.interface';
import { Reserva, CreateReservaRequest } from '../../features/reservas/models/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly _http = inject(HttpClient);

  getMisReservas() {
    return this._http.get<ApiResponse<Reserva[]>>(`${environment.apiUrl}/reservas/mis-reservas`);
  }

  crearReserva(request: CreateReservaRequest) {
    return this._http.post<ApiResponse<Reserva>>(`${environment.apiUrl}/reservas`, request);
  }

}
