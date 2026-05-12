import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nineth-component',
  imports: [ReactiveFormsModule],
  templateUrl: './nineth-component.html',
  styleUrl: './nineth-component.css',
})
export class NinethComponent {

  formulario = new FormGroup({
    nome: new FormControl(""),
    cidade: new FormControl(""),
    telefone: new FormControl(""),
  });

}
