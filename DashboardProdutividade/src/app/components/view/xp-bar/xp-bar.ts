import { Component, computed, inject } from '@angular/core';
import { XpBarService } from '../../../services/xp-bar/xp-bar-service';

@Component({
  selector: 'app-xp-bar',
  imports: [],
  templateUrl: './xp-bar.html',
  styleUrl: './xp-bar.css',
})
export class XpBar {
  private xpService = inject(XpBarService);

  protected totalXp = computed(() => this.xpService.getGapLevel());
  protected conqueredXp = computed(() => this.xpService.getActXp());
  protected level = computed(() => this.xpService.getLevel());

  protected barPercentage = computed(() => {
    const total = this.totalXp();
    return total > 0 ? (this.conqueredXp() / total) * 100 : 0;
  });

  addXp(num: number) {
    this.xpService.adcXP(num);
  }

  subXp(num: number) {
    this.xpService.subXp(num);
  }
}
