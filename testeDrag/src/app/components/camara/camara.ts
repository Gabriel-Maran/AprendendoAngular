import { Component, input, output, WritableSignal } from '@angular/core';
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
  // Inputs recebem os Signals diretamente do Pai
  listaMatrizes = input.required<WritableSignal<Item[][][]>>();
  idMatriz = input.required<number>();
  contadorIndex = input.required<WritableSignal<number>>();

  aoSoltar(event: CdkDragDrop<PosicaoMatriz>) {
    const origem = event.item.data;
    const destino = event.container.data;
    if (!origem || !destino) return;

    // Atualiza o Signal diretamente de forma simples
    this.listaMatrizes().update((m) => {
      const temp = m[origem.fromM][origem.linha][origem.col];
      m[origem.fromM][origem.linha][origem.col] = m[destino.fromM][destino.linha][destino.col];
      m[destino.fromM][destino.linha][destino.col] = temp;
      return [...m]; // Apenas força a notificação do Signal
    });
  }

  criaItemPos(linha: number, col: number) {
    const id = this.idMatriz();

    this.listaMatrizes().update((m) => {
      m[id][linha][col] = {
        nome: 'Item ' + this.contadorIndex()(),
        isEmpty: false,
        matrizOwner: id + 1,
      };
      return [...m];
    });

    this.contadorIndex().update((v) => v + 1);
  }
}
