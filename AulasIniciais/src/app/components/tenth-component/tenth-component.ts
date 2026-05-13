import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../../model/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tenth-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tenth-component.html',
  styleUrl: './tenth-component.css',
})
export class TenthComponent {
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  pessoas: Pessoa[] = [];
  indexPessoa: number = -1;
  isCadastrando: boolean = true;

  cadastro() {
    this.pessoas.push(this.formulario.value as Pessoa);
    this.formulario.reset();
  }

  selecionar(index: number) {
    this.indexPessoa = index;
    this.formulario.setValue({
      nome: this.pessoas[index].nome,
      idade: this.pessoas[index].idade,
      cidade: this.pessoas[index].cidade,
    });
    this.isCadastrando = false;
  }

  alteracao() {
    this.pessoas[this.indexPessoa] = this.formulario.value as Pessoa;
    this.isCadastrando = true;
    this.formulario.reset();
  }

  remover() {
    this.pessoas.splice(this.indexPessoa, 1);
    this.formulario.reset();
    this.isCadastrando = true;
  }

  cancelar() {
    this.formulario.reset();
    this.isCadastrando = true;
  }
}
