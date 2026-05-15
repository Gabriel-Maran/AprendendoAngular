import { Component, computed, effect, input, Input, signal } from '@angular/core';
import { TaskService } from '../../services/task/task-service';
import { RouterLink } from '@angular/router';
import { Viewing } from '../../components/task-view/viewing/viewing';
import { Editing } from '../../components/task-view/editing/editing';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-view',
  imports: [RouterLink, Viewing, Editing],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
})
export class TaskView {
  id = input.required<string>();
  status: 'edit' | 'view' = 'view';
  task = computed(() => this.taskService.getTask(this.id()));
  dataAgora = signal<number>(Date.now());
  constructor(private taskService: TaskService) {
    effect(() => {
      this.task(); // Regista a dependência reativa
      this.dataAgora.set(Date.now());
    });
  }

  switchStatus() {
    if (this.status === 'view') {
      this.status = 'edit';
      return;
    }
    this.status = 'view';
    this.task = computed(() => this.taskService.getTask(this.id()));
  }
}
