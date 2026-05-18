import { Routes } from '@angular/router';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { NewEvent } from './app/pages/new-event/new-event';

export const routes: Routes = [
  // Rota padrão (Home): Redireciona vazio para /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rota normal
  { path: 'home', component: Dashboard },
  { path: 'event/new', component: NewEvent },

  // { path: 'sobre', component: SobreComponent },

  // Rota com parâmetro dinâmico (ex: /usuario/123)
  // { path: 'usuario/:id', component: UsuarioDetalhesComponent },

  // Rota coringa (Wildcard): Captura qualquer URL inexistente (deve ficar no final)
  // { path: '**', component: PaginaNaoEncontradaComponent },
];
