import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerService } from './services/timer/timer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('DashboardProdutividade');
  timer = inject(TimerService);
}
