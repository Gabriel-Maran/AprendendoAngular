import { Component, Input, output } from '@angular/core';
import { Task } from '../../models/Task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  imports: [RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  whenDoneATask = output<Task>();
  @Input() tasks: Task[] = [];
  formatarData(dataStr: string) {
    return dataStr.split('T')[0].split('-').reverse().join('/');
  }

  switchValue(task: Task) {
    this.whenDoneATask.emit(task);
  }
}
