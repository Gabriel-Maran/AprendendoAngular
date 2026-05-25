import { Rarity } from './Rarity';

export interface Reward {
  id: number;
  name: string;
  description: string;
  value: number;
  purchased: boolean;
  is_used: boolean;
  rarity: Rarity;
}
