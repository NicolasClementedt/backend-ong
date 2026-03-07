// tipos customizados do sistema

export enum Categoria {
  ALIMENTO = 'ALIMENTO',
  ROUPA = 'ROUPA',
  HIGIENE = 'HIGIENE',
  BRINQUEDO = 'BRINQUEDO',
  LIMPEZA = 'LIMPEZA',
  OUTRO = 'OUTRO',
}

export enum TipoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

export enum CategoriaDestino {
  FAMILIA = 'FAMILIA',
  EVENTO = 'EVENTO',
  PARCEIRO = 'PARCEIRO',
  OUTRO = 'OUTRO',
}

export enum PerfilUsuario {
  ADMIN = 'ADMIN',
  USUARIO = 'USUARIO',
}

export enum NivelAlerta {
  VERDE = 'VERDE',
  AMARELO = 'AMARELO',
  VERMELHO = 'VERMELHO',
}
