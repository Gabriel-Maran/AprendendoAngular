import { Component, input, output, inject, effect } from '@angular/core';
import { Task } from '../../../models/Task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateNowOrGreater } from '../../../utils/validation/dateNowOrGreater';
import { TaskService } from '../../../services/task/task-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editing',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editing.html',
  styleUrl: './editing.css',
})
export class Editing {
  private taskService = inject(TaskService);

  task = input<Task>();
  switchStatus = output<void>();

  formsEdit = new FormGroup({
    id: new FormControl<string | number | undefined>(undefined),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    }),
    date: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const taskData = this.task();
      if (!taskData) return;
      this.formsEdit.patchValue({
        id: taskData.id,
        title: taskData.title,
        date: taskData.date,
        description: taskData.description,
      });
    });
  }

  voltar() {
    this.switchStatus.emit();
  }

  atualizarForm() {
    if (this.formsEdit.invalid) {
      this.formsEdit.markAllAsTouched();
      return;
    }

    const rawValues = this.formsEdit.getRawValue();

    const taskEdit: Task = {
      id: String(rawValues.id ?? ''),
      title: rawValues.title,
      description: rawValues.description,
      date: rawValues.date,
      isDone: this.task()?.isDone ?? false,
    };

    this.taskService.updateTask(this.task()?.id ?? '', taskEdit);
    this.voltar();
  }
}
