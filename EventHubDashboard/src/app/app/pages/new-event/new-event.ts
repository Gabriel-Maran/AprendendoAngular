import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorias } from '../../models/enums/Categorias';
import { Validacoes } from '../../utils/Validacoes';

@Component({
  selector: 'app-new-event',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-event.html',
  styleUrl: './new-event.css',
})
export class NewEvent {
  forms = new FormGroup({
    id: new FormControl(0),
    titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    descricao: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    local: new FormControl('', [Validators.required]),
    preco: new FormControl(0, [Validators.required]),
    categoria: new FormControl(Categorias.VAZIO, [Validacoes.naoPodeSer(Categorias.VAZIO)]),
    imagemUrl: new FormControl('', [Validators.required]),
    inscritos: new FormControl(0, [Validators.required]),
    destaque: new FormControl(false, [Validators.required]),
  });
}
