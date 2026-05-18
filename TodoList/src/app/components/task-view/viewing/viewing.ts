import { Component, effect, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/task/task-service';

@Component({
  selector: 'app-viewing',
  imports: [RouterLink],
  templateUrl: './viewing.html',
  styleUrl: './viewing.css',
})
export class Viewing {
  private taskService = inject(TaskService);
  task = input<Task>();
  switchStatus = output<void>();
  dataAgora = signal<number>(Date.now());
  constructor() {
    effect(() => {
      this.dataAgora.set(Date.now());
    });
  }
  voltar() {
    this.switchStatus.emit();
  }

  deletarTask() {
    const id = this.task()?.id;
    if (id) {
      this.taskService.deleteTask(id);
    }
  }

  dateToVisualDate(data: Date): string {
    return data.toString().split('-').reverse().join('/');
  }
}
