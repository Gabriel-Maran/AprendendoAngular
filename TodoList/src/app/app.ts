import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro';
import { Lista } from './components/lista/lista';
import { Task } from './models/Task';
import { LocalStorage } from './services/local-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cadastro, Lista],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('TodoList');
  tasks: Task[] = [];
  constructor(private storage: LocalStorage) {}

  ngOnInit(): void {
    this.tasks = this.storage.get('tasks') ?? [];
  }

  addNewTask(task: Task) {
    this.tasks.push(task);
    console.log(this.tasks);
    this.storage.set('tasks', this.tasks);
  }

  doneTask(id: string) {
    this.tasks = this.tasks.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item,
    );
    this.storage.set('tasks', this.tasks);
  }
}
