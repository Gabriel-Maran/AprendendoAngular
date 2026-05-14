import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro';
import { Lista } from './components/lista/lista';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cadastro, Lista],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TodoList');
}
