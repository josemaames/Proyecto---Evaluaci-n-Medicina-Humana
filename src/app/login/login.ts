import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './login.html',

  styleUrl: './login.css',
})
export class Login {
  usuario = '';

  password = '';

  mostrarPassword = false;

  constructor(private router: Router) {}

  login() {
    // LOGIN ADMINISTRADOR

    if (this.usuario === 'admin' && this.password === '1234') {
      this.router.navigate(['/admin']);
    }

    // LOGIN USUARIO
    else if (this.usuario === 'usuario' && this.password === '1234') {
      this.router.navigate(['/panel-usuario']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
