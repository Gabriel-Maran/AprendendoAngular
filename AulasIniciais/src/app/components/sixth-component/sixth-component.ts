import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sixth-component',
  imports: [CommonModule],
  templateUrl: './sixth-component.html',
  styleUrl: './sixth-component.css',
})
export class SixthComponent {
  addLinguagem:string = 'HTML'
}
