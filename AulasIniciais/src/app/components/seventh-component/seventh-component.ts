import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Aluno{
  nome: string,
  nota: number,
}

@Component({
  selector: 'app-seventh-component',
  imports: [CommonModule],
  templateUrl: './seventh-component.html',
  styleUrl: './seventh-component.css',
})
export class SeventhComponent {
  alunos:Aluno[] = [
    {nome: "João", nota: 10},
    {nome: "Carlos", nota: 5},
    {nome: "Gustavo", nota: 7},
    {nome: "Pedro", nota: 2}
  ].sort((a,b) => b.nota - a.nota);
  
}
