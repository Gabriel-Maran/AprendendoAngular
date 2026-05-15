import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../../components/cadastro/cadastro';
import { Lista } from '../../components/lista/lista';
import { LocalStorage } from '../../services/storage/local-storage';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task/task-service';

@Component({
  selector: 'app-home',
  imports: [Cadastro, Lista],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.tasks;
  }

  addNewTask(task: Task) {
    this.taskService.addNewTask(task);
  }

  doneTask(id: string) {
    this.tasks = this.taskService.doneTask(id);
  }
}
