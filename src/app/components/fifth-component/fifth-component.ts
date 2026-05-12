import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fifth-component',
  imports: [CommonModule],
  templateUrl: './fifth-component.html',
  styleUrl: './fifth-component.css',
})
export class FifthComponent {
  nomes:string[] = ['João', 'Gustavo', 'Gabriel'];

}
