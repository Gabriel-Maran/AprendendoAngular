export interface Item {
  nome?: string;
  tamanho?: { width: number; height: number };
  isEmpty: boolean;
  matrizOwner: number; // Mapeia o dono real (1 ou 2)
}
