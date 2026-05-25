import { Component } from '@angular/core';
import { HeaderDefault } from '../../components/header-default/header-default';
import { BarItens } from '../../model/BarItens';
import { ComprasView } from '../../components/compras-view/compras-view';

@Component({
  selector: 'app-home',
  imports: [HeaderDefault, ComprasView],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  selectedBar: BarItens = 'HABITOS';

  switchBar(to: BarItens) {
    this.selectedBar = to;
  }
}
