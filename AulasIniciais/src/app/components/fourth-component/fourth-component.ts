import { Component } from '@angular/core';

@Component({
  selector: 'app-fourth-component',
  imports: [],
  templateUrl: './fourth-component.html',
  styleUrl: './fourth-component.css',
})
export class FourthComponent {
  exibirQuadrado: boolean = true;
  trocarExibir(){
    this.exibirQuadrado = !this.exibirQuadrado
  }
}
