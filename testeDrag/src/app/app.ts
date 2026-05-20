import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Item } from './model/Item';
import { PosicaoMatriz } from './model/PosicaoMatriz';

type List<T> = T[];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  matrizes: List<Item[][]> = [];
  readonly LINHAS = 12;
  readonly COLUNAS = 7;
  index = signal(0);

  ngOnInit(): void {
    this.inicializarMatriz();
  }

  inicializarMatriz(): void {
    // CORREÇÃO: Cria explicitamente as duas matrizes vazias na lista principal
    this.matrizes = [[], []];

    for (let i = 0; i < this.LINHAS; i++) {
      // Cria objetos independentes na memória para cada célula
      this.matrizes[0].push(
        Array.from({ length: this.COLUNAS }, () => ({ isEmpty: true, matrizOwner: 1 })),
      );
      this.matrizes[1].push(
        Array.from({ length: this.COLUNAS }, () => ({ isEmpty: true, matrizOwner: 2 })),
      );
    }
  }

  aoSoltar(event: CdkDragDrop<PosicaoMatriz>) {
    const origem = event.item.data;
    const destino = event.container.data;

    if (!origem || !destino) return;

    // Faz a troca direta (swap) dos valores na matriz
    const temp = this.matrizes[origem.fromM][origem.linha][origem.col];
    this.matrizes[origem.fromM][origem.linha][origem.col] =
      this.matrizes[destino.fromM][destino.linha][destino.col];
    this.matrizes[destino.fromM][destino.linha][destino.col] = temp;
  }

  criaItemPos(linha: number, column: number, localM: number) {
    // CORREÇÃO: Mantém a propriedade obrigatória 'matrizOwner' ativa ao sobrescrever o objeto
    this.matrizes[localM][linha][column] = {
      nome: 'Item ' + this.index(),
      isEmpty: false,
      matrizOwner: localM + 1, // Mantém o ID correto (1 ou 2) baseado no índice
    };
    this.index.update((v) => v + 1);
  }
}
