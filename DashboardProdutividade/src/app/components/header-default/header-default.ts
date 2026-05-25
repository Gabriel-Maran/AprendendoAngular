import { Component, inject, signal } from '@angular/core';
import { XpBar } from '../xp-bar/xp-bar';
import { CoinService } from '../../services/coin/coin-service';

@Component({
  selector: 'app-header-default',
  imports: [XpBar],
  templateUrl: './header-default.html',
  styleUrl: './header-default.css',
})
export class HeaderDefault {
  coinService = inject(CoinService);
  coins = signal<number>(this.coinService.getCoins());

  addCoins(qntdd: number) {
    this.coinService.addCoins(qntdd);
    this.coins.set(this.coins() + qntdd);
  }

  spendCoins(qntdd: number) {
    this.coinService.spendCoins(qntdd);
    this.coins.set(this.coinService.getCoins());
  }
}
