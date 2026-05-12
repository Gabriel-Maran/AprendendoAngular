import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eigth-component',
  imports: [FormsModule],
  templateUrl: './eigth-component.html',
  styleUrl: './eigth-component.css',
})
export class EigthComponent {
  nome: string = "";
  cidade: string = ""
}
