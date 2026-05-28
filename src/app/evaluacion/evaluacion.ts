import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluacion',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './evaluacion.html',

  styleUrl: './evaluacion.css',
})
export class Evaluacion implements OnInit {
  preguntas = [
    {
      pregunta: '¿Qué es Angular?',

      opciones: ['Framework frontend', 'Base de datos', 'Servidor', 'Editor de texto'],

      correcta: 'Framework frontend',

      respuestaSeleccionada: '',
    },

    {
      pregunta: '¿Qué lenguaje usa Node.js?',

      opciones: ['Python', 'Java', 'JavaScript', 'PHP'],

      correcta: 'JavaScript',

      respuestaSeleccionada: '',
    },

    {
      pregunta: '¿Qué es PostgreSQL?',

      opciones: ['Framework', 'Base de datos', 'Servidor web', 'Sistema operativo'],

      correcta: 'Base de datos',

      respuestaSeleccionada: '',
    },
  ];

  preguntaActual = 0;

  puntaje = 0;

  examenFinalizado = false;

  evaluacionIniciada = false;

  tiempoRestante = 3600;

  intervalo: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  iniciarEvaluacion() {
    this.evaluacionIniciada = true;

    this.iniciarTemporizador();
  }

  iniciarTemporizador() {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;

        this.cdr.detectChanges();
      } else {
        this.finalizarEvaluacion();
      }
    }, 1000);
  }

  obtenerTiempoFormateado() {
    const minutos = Math.floor(this.tiempoRestante / 60);

    const segundos = this.tiempoRestante % 60;

    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  siguientePregunta() {
    if (this.preguntas[this.preguntaActual].respuestaSeleccionada === '') {
      return;
    }

    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
    } else {
      this.finalizarEvaluacion();
    }
  }

  finalizarEvaluacion() {
    clearInterval(this.intervalo);

    this.puntaje = 0;

    this.preguntas.forEach((pregunta) => {
      if (pregunta.respuestaSeleccionada === pregunta.correcta) {
        this.puntaje++;
      }
    });

    this.examenFinalizado = true;
  }
}
