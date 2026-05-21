import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Item } from './model/Item';
import { PosicaoMatriz } from './model/PosicaoMatriz';
import { Camara } from './components/camara/camara';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule, Camara],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
// app.ts
export class App implements OnInit {
  matrizes = signal<Item[][][]>([]); // Mantém o Signal tridimensional
  isModalOpen = false;
  readonly LINHAS = 12;
  readonly COLUNAS = 7;
  index = signal(0);

  ngOnInit(): void {
    // Inicializa as duas matrizes vazias
    const m0 = Array.from({ length: this.LINHAS }, () =>
      Array.from({ length: this.COLUNAS }, () => ({ isEmpty: true, matrizOwner: 1 })),
    );
    const m1 = Array.from({ length: this.LINHAS }, () =>
      Array.from({ length: this.COLUNAS }, () => ({ isEmpty: true, matrizOwner: 2 })),
    );
    this.matrizes.set([m0, m1]);
  }
}
