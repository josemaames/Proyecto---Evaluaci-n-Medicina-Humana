import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrabajadoresService {
  constructor(private http: HttpClient) {}

  obtenerTrabajadores() {
    return this.http.get('http://localhost:3000/trabajadores');
  }
}
