import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-usuario',

  standalone: true,

  imports: [CommonModule, RouterLink],

  templateUrl: './panel-usuario.html',

  styleUrl: './panel-usuario.css',
})
export class PanelUsuario {}
