import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateNowOrGreater } from '../../utils/validation/dateNowOrGreater';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  forms = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    date: new FormControl(null, [Validators.required, dateNowOrGreater()]),
    description: new FormControl(''),
  });
  onTaskCreated = output<Task>();

  salvarForms() {
    this.forms.markAllAsTouched();
    if (this.forms.invalid) {
      return;
    }
    const formValues = this.forms.getRawValue();

    const novaTask: Task = {
      id: crypto.randomUUID(),
      title: formValues.title!,
      description: formValues.description ?? '',
      date: formValues.date!,
      isDone: false,
    };
    this.onTaskCreated.emit(novaTask);
    this.forms.reset();
  }
}
