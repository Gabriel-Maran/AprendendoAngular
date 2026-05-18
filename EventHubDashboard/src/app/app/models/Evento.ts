export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: string; // Formato ISO: "YYYY-MM-DDTHH:mm:ssZ"
  local: string;
  preco: number; // 0 significa gratuito
  categoria: 'Conferência' | 'Workshop' | 'Concerto' | 'Teatro' | 'Desporto';
  imagemUrl: string;
  capacidadeMaxima: number;
  inscritos: number;
  destaque: boolean;
}
