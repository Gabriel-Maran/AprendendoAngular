import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponent } from './components/first-component/first-component';
import { SecondComponent } from './components/second-component/second-component';
import { ThirdComponent } from './components/third-component/third-component';
import { FourthComponent } from './components/fourth-component/fourth-component';
import { FifthComponent } from './components/fifth-component/fifth-component';
import { SixthComponent } from './components/sixth-component/sixth-component';
import { SeventhComponent } from './components/seventh-component/seventh-component';
import { CommonModule } from '@angular/common';
import { EigthComponent } from './components/eigth-component/eigth-component';
import { NinethComponent } from './components/nineth-component/nineth-component';
import { TenthComponent } from './components/tenth-component/tenth-component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TenthComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('teste');
}
