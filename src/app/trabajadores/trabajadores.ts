import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trabajadores',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './trabajadores.html',

  styleUrl: './trabajadores.css',
})
export class Trabajadores {
  trabajadores: any[] = [];

  nombre = '';

  curso = '';

  estado = '';

  // BUSCADOR

  busqueda = '';

  // EDITAR

  editando = false;

  trabajadorEditandoId: number | null = null;

  constructor(private http: HttpClient) {}

  obtenerTrabajadores() {
    this.http
      .get<any[]>('http://localhost:3000/trabajadores')

      .subscribe((data) => {
        this.trabajadores = data;
      });
  }

  // FILTRAR TRABAJADORES

  filtrarTrabajadores() {
    return this.trabajadores.filter(
      (trabajador) =>
        trabajador.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        trabajador.curso.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        trabajador.estado.toLowerCase().includes(this.busqueda.toLowerCase()),
    );
  }

  // AGREGAR O EDITAR

  agregarTrabajador() {
    const nuevoTrabajador = {
      nombre: this.nombre,

      curso: this.curso,

      estado: this.estado,
    };

    // EDITAR

    if (this.editando && this.trabajadorEditandoId) {
      this.http
        .put(
          `http://localhost:3000/trabajadores/${this.trabajadorEditandoId}`,

          nuevoTrabajador,
        )

        .subscribe(() => {
          this.obtenerTrabajadores();

          this.limpiarFormulario();
        });
    }

    // AGREGAR
    else {
      this.http
        .post(
          'http://localhost:3000/trabajadores',

          nuevoTrabajador,
        )

        .subscribe(() => {
          this.obtenerTrabajadores();

          this.limpiarFormulario();
        });
    }
  }

  // CARGAR DATOS EN FORMULARIO

  editarTrabajador(trabajador: any) {
    this.editando = true;

    this.trabajadorEditandoId = trabajador.id;

    this.nombre = trabajador.nombre;

    this.curso = trabajador.curso;

    this.estado = trabajador.estado;
  }

  // LIMPIAR FORMULARIO

  limpiarFormulario() {
    this.nombre = '';

    this.curso = '';

    this.estado = '';

    this.editando = false;

    this.trabajadorEditandoId = null;
  }

  ngOnInit() {
    this.obtenerTrabajadores();
  }
}
