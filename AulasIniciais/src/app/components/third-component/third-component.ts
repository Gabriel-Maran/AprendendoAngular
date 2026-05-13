import { Component } from '@angular/core';

@Component({
  selector: 'app-third-component',
  imports: [],
  templateUrl: './third-component.html',
  styleUrl: './third-component.css',
})
export class ThirdComponent {
  img:string = 'cachorro01.jpg'

  alterarImg(){
    if(this.img === 'cachorro01.jpg'){
      this.img = 'cachorro02.jpg'
      return;
    }
    this.img = 'cachorro01.jpg'
  }
}
