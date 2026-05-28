import { Routes } from '@angular/router';

import { Login } from './login/login';

import { Evaluacion } from './evaluacion/evaluacion';

import { Admin } from './admin/admin';

import { PanelUsuario } from './panel-usuario/panel-usuario';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },

  {
    path: 'panel-usuario',
    component: PanelUsuario,
  },

  {
    path: 'evaluacion',
    component: Evaluacion,
  },

  {
    path: 'admin',
    component: Admin,
  },
];
