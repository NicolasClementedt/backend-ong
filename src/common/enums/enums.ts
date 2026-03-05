// tipos customizados do sistema

export enum TipoCategoria {
  ALIMENTO = 'ALIMENTO',
  VESTIMENTA = 'VESTIMENTA',
  BRINQUEDO = 'BRINQUEDO',
  HIGIENE = 'HIGIENE',
  LIMPEZA = 'LIMPEZA',
  OUTRO = 'OUTRO',
}

export enum UnidadeMedida {
  KG = 'KG',
  GRAMA = 'GRAMA',
  LITRO = 'LITRO',
  ML = 'ML',
  UNIDADE = 'UNIDADE',
  PECA = 'PECA',
  CAIXA = 'CAIXA',
  PACOTE = 'PACOTE',
}

export enum TipoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
  AJUSTE = 'AJUSTE',
  PERDA = 'PERDA',
}

export enum TipoCesta {
  BASICA = 'BASICA',
  NATALINA = 'NATALINA',
  PASCOA = 'PASCOA',
  ESCOLAR = 'ESCOLAR',
  HIGIENE = 'HIGIENE',
  PERSONALIZADA = 'PERSONALIZADA',
}

export enum NivelAlerta {
  VERDE = 'VERDE',
  AMARELO = 'AMARELO',
  LARANJA = 'LARANJA',
  VERMELHO = 'VERMELHO',
}

export enum TipoAlerta {
  ESTOQUE_BAIXO = 'ESTOQUE_BAIXO',
  SEM_ESTOQUE = 'SEM_ESTOQUE',
  VALIDADE_PROXIMA = 'VALIDADE_PROXIMA',
  VENCIDO = 'VENCIDO',
  GIRO_ALTO = 'GIRO_ALTO',
  BLOQUEIO_CESTA = 'BLOQUEIO_CESTA',
}

export enum StatusCesta {
  PLANEJADA = 'PLANEJADA',
  MONTADA = 'MONTADA',
  DISTRIBUIDA = 'DISTRIBUIDA',
  CANCELADA = 'CANCELADA',
}
