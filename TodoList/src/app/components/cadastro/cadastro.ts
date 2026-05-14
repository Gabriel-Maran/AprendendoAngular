import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateNowOrGreater } from '../../utils/validation/dateNowOrGreater';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  forms = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', [Validators.required, Validators.min(3), Validators.max(15)]),
    date: new FormControl(new Date(), [Validators.required, dateNowOrGreater()]),
    description: new FormControl('', [Validators.required, Validators.min(3), Validators.max(15)]),
  });
  salvarForms() {}
}
