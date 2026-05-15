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
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, dateNowOrGreater()],
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const taskData = this.task();
      if (!taskData) return;
      const localDate = taskData.date ? new Date(taskData.date) : null;
      const formattedDate = localDate
        ? `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`
        : '';

      this.formsEdit.patchValue({
        id: taskData.id,
        title: taskData.title,
        date: formattedDate,
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
    const formDate = rawValues.date;

    const parsedDate = formDate ? new Date(`${formDate}T00:00:00`) : new Date();

    const taskEdit: Task = {
      id: String(rawValues.id ?? ''),
      title: rawValues.title,
      description: rawValues.description,
      date: parsedDate,
      isDone: this.task()?.isDone ?? false,
    };

    this.taskService.updateTask(this.task()?.id ?? '', taskEdit);
    this.voltar();
  }
}
