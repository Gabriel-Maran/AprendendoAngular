import { Component, input, output } from '@angular/core';
import { Item } from '../../model/Item';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { PosicaoMatriz } from '../../model/PosicaoMatriz';

@Component({
  selector: 'app-camara',
  imports: [DragDropModule],
  templateUrl: './camara.html',
  styleUrl: './camara.css',
})
export class Camara {
  matriz = input<Item[][]>();
  posicaoTrocada = output<CdkDragDrop<PosicaoMatriz>>();
  criarNovoItem = output<{ i: number; j: number; pos: number }>();

  aoSoltar(event: CdkDragDrop<PosicaoMatriz>) {
    this.posicaoTrocada.emit(event);
  }

  criaItemPos(i: number, j: number, pos: number) {
    this.criarNovoItem.emit({ i, j, pos });
  }
}
