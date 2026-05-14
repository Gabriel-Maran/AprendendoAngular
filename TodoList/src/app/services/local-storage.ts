import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

//Isso assusta quando se vê a primeira vez? Sim kkkkkk
//Mas é algo ridiculamente simples, é so um service de um CRUD de Local Storage
//Poderia ser usado de forma independente?
//  Sim, mas descentraliza e deixa o codigo menos usavel e facil de fazer manutenção
//  Então é melhor deixar assim mesmo
@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private isBrowser: boolean;

  // Garante que o localStorage só é acedido se estiver no navegador, evitando erros no SSR (servidor).
  //Assusta? Sim, mas so verifica se é navegador ou não
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  set(key: string, value: any): void {
    if (this.isBrowser) {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, data);
    }
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return data as unknown as T;
    }
  }

  remove(key: string) {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
