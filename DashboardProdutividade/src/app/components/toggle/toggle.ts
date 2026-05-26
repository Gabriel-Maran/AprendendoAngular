import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  imports: [],
  templateUrl: './toggle.html',
  styleUrl: './toggle.css',
})
export class Toggle {
  ativo = input<boolean>(false);
  alternar = output<void>();

  mudar() {
    this.alternar.emit();
  }
}
