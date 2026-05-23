export interface Reserva {
  id?: number;
  fechaInicio: string;
  fechaFin: string;
  cantidadPersonas: number;
  estadoReserva: string;
  fechaCreacion: string;
  sede: string;
  alojamiento: string;
  descripcion: string;
  valorTotal: number;
}

export interface CreateReservaRequest {
  fecha: string;
  descripcion: string;
  monto: number;
}
