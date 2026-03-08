// Enums
export const Categoria = {
  ALIMENTO: "ALIMENTO",
  ROUPA: "ROUPA",
  HIGIENE: "HIGIENE",
  BRINQUEDO: "BRINQUEDO",
  LIMPEZA: "LIMPEZA",
  OUTRO: "OUTRO",
} as const;
export type Categoria = (typeof Categoria)[keyof typeof Categoria];

export const TipoTransacao = {
  ENTRADA: "ENTRADA",
  SAIDA: "SAIDA",
} as const;
export type TipoTransacao = (typeof TipoTransacao)[keyof typeof TipoTransacao];

export const CategoriaDestino = {
  FAMILIA: "FAMILIA",
  EVENTO: "EVENTO",
  PARCEIRO: "PARCEIRO",
  OUTRO: "OUTRO",
} as const;
export type CategoriaDestino =
  (typeof CategoriaDestino)[keyof typeof CategoriaDestino];

export const NivelAlerta = {
  VERDE: "VERDE",
  AMARELO: "AMARELO",
  VERMELHO: "VERMELHO",
} as const;
export type NivelAlerta = (typeof NivelAlerta)[keyof typeof NivelAlerta];

// Item
export interface Item {
  id: string;
  nome: string;
  categoria: Categoria;
  unidadeMedida: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
  nivelAlerta: NivelAlerta;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreateItemDto {
  nome: string;
  categoria: Categoria;
  unidadeMedida: string;
  quantidadeMinima: number;
}

export interface UpdateItemDto {
  nome?: string;
  categoria?: Categoria;
  unidadeMedida?: string;
  quantidadeMinima?: number;
}

// Transacao
export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  quantidade: number;
  observacao?: string;
  categoriaDestino?: CategoriaDestino;
  descricaoDestino?: string;
  data: string;
  criadoEm: string;
  itemId: string;
  item: Item;
}

export interface CreateTransacaoDto {
  itemId: string;
  tipo: TipoTransacao;
  quantidade: number;
  observacao?: string;
  categoriaDestino?: CategoriaDestino;
  descricaoDestino?: string;
  data?: string;
}

export interface FilterTransacaoDto {
  itemId?: string;
  tipo?: TipoTransacao;
  dataInicio?: string;
  dataFim?: string;
}

// Dashboard
export interface ResumoAlertas {
  verde: number;
  amarelo: number;
  vermelho: number;
}

export interface TopSaida {
  nome: string;
  totalSaida: number;
  unidadeMedida: string;
}

export interface ItemCritico {
  nome: string;
  unidadeMedida: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
  percentual: number;
  nivelAlerta: NivelAlerta;
}

export interface Dashboard {
  resumoAlertas: ResumoAlertas;
  topSaidas: TopSaida[];
  itensCriticos: ItemCritico[];
}
