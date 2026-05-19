import { Routes } from '@angular/router';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { NewEvent } from './app/pages/new-event/new-event';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Dashboard },
  { path: 'event/new', component: NewEvent },
  { path: 'event/:id', component: NewEvent },
];
