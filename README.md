# 🏛️ Sistema de Gestão de Arrecadação para ONGs
## Plataforma Inteligente de Controle de Estoque e Distribuição

---

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Modelagem de Dados](#modelagem-de-dados)
5. [Módulos Detalhados](#módulos-detalhados)
6. [Sistema de Alertas](#sistema-de-alertas)
7. [Calculadora de Cestas Básicas](#calculadora-de-cestas-básicas)
8. [Inteligência de Arrecadação](#inteligência-de-arrecadação)
9. [Roadmap de Desenvolvimento](#roadmap-de-desenvolvimento)

---

## 🎯 Visão Geral

Sistema completo para gestão de arrecadação e distribuição em ONGs, com foco principal em **alimentos** e extensível para roupas, brinquedos e outros itens.

### Objetivo Principal
Fornecer inteligência de dados para que ONGs saibam **exatamente o que arrecadar** e **quando arrecadar**, evitando desperdícios e otimizando campanhas.

### Diferencial Competitivo
- ✅ Calculadora automática de cestas básicas disponíveis
- ✅ Previsão inteligente de necessidades de arrecadação
- ✅ Sistema de alertas por criticidade
- ✅ Análise de sazonalidade e tendências
- ✅ Dashboard visual e intuitivo

---

## 🚀 Funcionalidades Principais

### 1. **Gestão de Inventário Multicanal**
- Cadastro de alimentos, roupas, brinquedos e outros itens
- Categorização hierárquica (Categoria → Subcategoria → Item)
- Controle de validade para itens perecíveis
- Unidades de medida flexíveis (kg, unidade, litro, peça)

### 2. **Calculadora de Cestas Básicas** 🎁
- Definição de composições de cestas (padrão ou personalizadas)
- Cálculo automático de quantas cestas podem ser montadas
- Visualização de itens faltantes para completar mais cestas
- Sugestão de cestas alternativas baseadas no estoque atual

### 3. **Sistema de Movimentação**
- Registro de entradas (doações, compras, campanhas)
- Registro de saídas (distribuição, cestas montadas)
- Histórico completo com rastreabilidade
- Origem/Destino da movimentação

### 4. **Inteligência de Arrecadação** 🧠
- Análise de giro de estoque
- Identificação de itens críticos
- Priorização por impacto nutricional
- Previsão de demanda com base em histórico

### 5. **Dashboard Estratégico** 📊
- Resumo de cestas disponíveis
- Alertas visuais por criticidade
- Gráficos de consumo vs. estoque
- Top itens com maior saída
- Itens próximos ao vencimento

---

## 🏗️ Arquitetura do Sistema

### Stack Tecnológico

#### Backend - NestJS
```
nestjs-ong-manager/
├── src/
│   ├── modules/
│   │   ├── alimentos/          # CRUD de alimentos
│   │   ├── itens/              # Gestão geral de itens (roupas, brinquedos)
│   │   ├── estoque/            # Controle de estoque atual
│   │   ├── movimentacao/       # Entradas e saídas
│   │   ├── cestas/             # Lógica de cestas básicas
│   │   ├── relatorios/         # Análises e relatórios
│   │   ├── alertas/            # Sistema de notificações
│   │   └── campanhas/          # Gestão de campanhas de arrecadação
│   ├── common/
│   │   ├── enums/
│   │   ├── interfaces/
│   │   └── utils/
│   └── config/
```

#### Frontend - React + TypeScript
```
react-ong-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── ResumoGeral.tsx
│   │   │   ├── CalculadoraCestas.tsx
│   │   │   └── AlertasCriticos.tsx
│   │   ├── Estoque/
│   │   │   ├── TabelaEstoque.tsx
│   │   │   ├── FormularioItem.tsx
│   │   │   └── FiltrosAvancados.tsx
│   │   ├── Movimentacao/
│   │   │   ├── RegistroEntrada.tsx
│   │   │   └── RegistroSaida.tsx
│   │   ├── Cestas/
│   │   │   ├── ComposicaoCesta.tsx
│   │   │   ├── VisualizadorCestas.tsx
│   │   │   └── ItemsFaltantes.tsx
│   │   └── Relatorios/
│   │       ├── GraficosConsumo.tsx
│   │       └── PrioridadesArrecadacao.tsx
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   └── types/
```

---

## 📊 Modelagem de Dados

### Entidades Principais

#### 1. **Categoria**
```typescript
{
  id: UUID
  nome: string                    // "Alimentos", "Roupas", "Brinquedos"
  tipo: TipoCategoria             // ALIMENTO, VESTIMENTA, BRINQUEDO, HIGIENE, OUTRO
  icone: string
  ativa: boolean
  criadoEm: Date
}
```

#### 2. **SubCategoria**
```typescript
{
  id: UUID
  categoriaId: UUID               // FK → Categoria
  nome: string                    // "Grãos", "Limpeza", "Infantil"
  prioridade: number              // 1-10 (para ordenação)
}
```

#### 3. **Item**
```typescript
{
  id: UUID
  subCategoriaId: UUID
  nome: string                    // "Arroz Branco", "Feijão Carioca"
  descricao: string
  unidadeMedida: UnidadeMedida    // KG, LITRO, UNIDADE, PECA
  perecivel: boolean
  diasValidadeMedia: number       // Para controle de vencimento
  valorNutricional: number        // 1-10 (para priorização)
  facilidadeArrecadacao: number   // 1-10 (histórico de doações)
  ativo: boolean
  criadoEm: Date
}
```

#### 4. **Estoque**
```typescript
{
  id: UUID
  itemId: UUID                    // FK → Item
  quantidade: number
  quantidadeReservada: number     // Para cestas em preparação
  quantidadeDisponivel: number    // Calculado: quantidade - reservada
  dataValidade: Date | null       // Para itens perecíveis
  lote: string | null
  localizacao: string             // "Depósito A", "Prateleira 3"
  ultimaAtualizacao: Date
}
```

#### 5. **Movimentacao**
```typescript
{
  id: UUID
  itemId: UUID
  tipo: TipoMovimentacao          // ENTRADA, SAIDA
  quantidade: number
  motivo: string                  // "Doação", "Campanha", "Distribuição"
  origem: string | null           // Para entradas
  destino: string | null          // Para saídas
  responsavel: string
  observacoes: string
  dataMovimentacao: Date
  criadoEm: Date
}
```

#### 6. **ComposicaoCesta** 🎁
```typescript
{
  id: UUID
  nome: string                    // "Cesta Básica Padrão", "Cesta Natal"
  descricao: string
  tipo: TipoCesta                 // BASICA, NATALINA, PASCOA, PERSONALIZADA
  ativa: boolean
  criadoEm: Date
}
```

#### 7. **ItemCesta**
```typescript
{
  id: UUID
  composicaoCestaId: UUID         // FK → ComposicaoCesta
  itemId: UUID                    // FK → Item
  quantidadeNecessaria: number
  obrigatorio: boolean            // true = sem ele não monta a cesta
  substitutos: UUID[]             // IDs de itens que podem substituir
}
```

#### 8. **CestasMontadas**
```typescript
{
  id: UUID
  composicaoCestaId: UUID
  dataMontagem: Date
  beneficiario: string
  responsavel: string
  observacoes: string
  itensUtilizados: {              // JSON com itens e quantidades usadas
    itemId: UUID
    quantidade: number
  }[]
}
```

#### 9. **AlertaEstoque**
```typescript
{
  id: UUID
  itemId: UUID
  nivelCriticidade: NivelAlerta   // VERDE, AMARELO, LARANJA, VERMELHO
  tipoAlerta: TipoAlerta          // ESTOQUE_BAIXO, VALIDADE_PROXIMA, SEM_ESTOQUE
  mensagem: string
  diasEstoqueRestante: number
  quantidadeSugerida: number      // Para arrecadação
  dataAlerta: Date
  resolvido: boolean
  dataResolucao: Date | null
}
```

#### 10. **ConfiguracaoAlerta**
```typescript
{
  id: UUID
  itemId: UUID | null             // null = configuração global
  diasEstoqueVerde: number        // > 14 dias
  diasEstoqueAmarelo: number      // 7-14 dias
  diasEstoqueLaranja: number      // 3-7 dias
  diasEstoqueVermelho: number     // < 3 dias
  diasAntesVencimento: number     // Alerta de validade
}
```

---

## 🎯 Módulos Detalhados

### Módulo 1: Gestão de Itens

**Endpoints Principais:**
```typescript
// Alimentos
POST   /api/alimentos
GET    /api/alimentos
GET    /api/alimentos/:id
PUT    /api/alimentos/:id
DELETE /api/alimentos/:id
GET    /api/alimentos/categoria/:categoriaId

// Itens Gerais (roupas, brinquedos, etc)
POST   /api/itens
GET    /api/itens
GET    /api/itens/tipo/:tipo          // VESTIMENTA, BRINQUEDO, etc
```

**Regras de Negócio:**
- Validação de unidade de medida por categoria
- Itens perecíveis obrigatoriamente têm `diasValidadeMedia`
- Valor nutricional apenas para alimentos
- Facilidade de arrecadação calculada automaticamente pelo histórico

---

### Módulo 2: Controle de Estoque

**Endpoints:**
```typescript
GET /api/estoque                        // Lista todo o estoque
GET /api/estoque/item/:itemId           // Estoque de um item específico
GET /api/estoque/criticos               // Itens em alerta
GET /api/estoque/vencimento-proximo     // Itens próximos ao vencimento
PUT /api/estoque/:id/ajuste             // Ajuste manual de estoque
```

**Cálculos Automáticos:**
```typescript
// Dias de estoque restante
diasEstoque = (quantidadeDisponivel / mediaSaidaDiaria)

// Quantidade em risco
emRisco = (diasEstoque < configuracaoAlerta.diasEstoqueAmarelo)
```

---

### Módulo 3: Movimentação

**Endpoints:**
```typescript
POST /api/movimentacao/entrada
POST /api/movimentacao/saida
GET  /api/movimentacao/historico/:itemId
GET  /api/movimentacao/relatorio
      ?dataInicio=2024-01-01
      &dataFim=2024-12-31
      &tipo=ENTRADA
```

**Hooks Automáticos:**
- Ao registrar entrada → Atualiza estoque + Recalcula alertas
- Ao registrar saída → Verifica disponibilidade + Atualiza estoque
- Ao finalizar movimentação → Registra histórico completo

---

### Módulo 4: Calculadora de Cestas Básicas 🎁

**O CORAÇÃO DO SISTEMA**

#### Endpoints:
```typescript
// Composições de cestas
POST /api/cestas/composicao
GET  /api/cestas/composicao
GET  /api/cestas/composicao/:id
PUT  /api/cestas/composicao/:id

// Cálculos inteligentes
GET  /api/cestas/calcular-disponiveis    // Quantas cestas posso montar?
GET  /api/cestas/itens-faltantes         // O que falta para mais cestas?
GET  /api/cestas/sugestoes-alternativas  // Cestas possíveis com estoque atual

// Montagem de cestas
POST /api/cestas/montar                  // Registra uma cesta montada
GET  /api/cestas/montadas                // Histórico de cestas
```

#### Lógica de Cálculo:

```typescript
// Exemplo: Cesta Básica Padrão
const cestaBasica = {
  nome: "Cesta Básica Padrão",
  itens: [
    { nome: "Arroz", quantidade: 5, unidade: "KG", obrigatorio: true },
    { nome: "Feijão", quantidade: 2, unidade: "KG", obrigatorio: true },
    { nome: "Açúcar", quantidade: 2, unidade: "KG", obrigatorio: true },
    { nome: "Óleo", quantidade: 2, unidade: "LITRO", obrigatorio: true },
    { nome: "Sal", quantidade: 1, unidade: "KG", obrigatorio: true },
    { nome: "Café", quantidade: 500, unidade: "GRAMAS", obrigatorio: true },
    { nome: "Macarrão", quantidade: 2, unidade: "KG", obrigatorio: true },
    { nome: "Farinha de Trigo", quantidade: 1, unidade: "KG", obrigatorio: false },
    { nome: "Leite em Pó", quantidade: 400, unidade: "GRAMAS", obrigatorio: false }
  ]
}

// Algoritmo de cálculo
function calcularCestasDisponiveis(composicao, estoque) {
  const itensObrigatorios = composicao.itens.filter(i => i.obrigatorio)
  
  const cestasPosiveis = itensObrigatorios.map(itemCesta => {
    const estoqueItem = estoque.find(e => e.itemId === itemCesta.itemId)
    return Math.floor(estoqueItem.quantidadeDisponivel / itemCesta.quantidade)
  })
  
  // O gargalo define quantas cestas podemos montar
  return Math.min(...cestasPosiveis)
}

// Resultado
{
  cestasDisponiveis: 47,
  itensFaltantes: [
    {
      item: "Arroz",
      estoqueAtual: 235,
      necessarioPara50Cestas: 250,
      diferenca: 15,
      unidade: "KG",
      criticidade: "LARANJA"  // Falta pouco!
    },
    {
      item: "Feijão",
      estoqueAtual: 94,
      necessarioPara50Cestas: 100,
      diferenca: 6,
      unidade: "KG",
      criticidade: "AMARELO"
    }
  ],
  projecao: {
    com10kgArroz: 49,      // Se arrecadar 10kg de arroz
    com20kgArroz: 51       // Se arrecadar 20kg de arroz
  }
}
```

#### Visualização no Dashboard:

```
┌─────────────────────────────────────────────────────┐
│  🎁 CESTAS BÁSICAS DISPONÍVEIS: 47                  │
├─────────────────────────────────────────────────────┤
│  Para completar 50 cestas, você precisa de:        │
│                                                     │
│  🟠 Arroz:  15 KG  (faltam 6% do estoque)          │
│  🟡 Feijão: 6 KG   (faltam 3% do estoque)          │
│                                                     │
│  [Gerar Campanha de Arrecadação] [Montar Cestas]  │
└─────────────────────────────────────────────────────┘
```

---

### Módulo 5: Sistema de Alertas 🚨

#### Níveis de Criticidade:

| Cor | Nível | Condição | Ação Sugerida |
|-----|-------|----------|---------------|
| 🟢 | VERDE | > 14 dias de estoque | Monitoramento normal |
| 🟡 | AMARELO | 7-14 dias de estoque | Incluir em próxima campanha |
| 🟠 | LARANJA | 3-7 dias de estoque | **Campanha urgente** |
| 🔴 | VERMELHO | < 3 dias de estoque | **CRÍTICO - Arrecadar imediatamente** |

#### Tipos de Alerta:

```typescript
enum TipoAlerta {
  ESTOQUE_BAIXO = "Estoque abaixo do ponto de ressuprimento",
  SEM_ESTOQUE = "Item zerado no estoque",
  VALIDADE_PROXIMA = "Itens próximos ao vencimento (< 15 dias)",
  VENCIDO = "Itens vencidos - descarte necessário",
  GIRO_ALTO = "Item com alta rotatividade - arrecadar mais",
  BLOQUEIO_CESTA = "Item obrigatório faltando - cestas bloqueadas"
}
```

#### Endpoints:
```typescript
GET /api/alertas                    // Todos os alertas ativos
GET /api/alertas/criticos           // Apenas VERMELHO e LARANJA
PUT /api/alertas/:id/resolver       // Marca alerta como resolvido
GET /api/alertas/configuracao       // Configurações de thresholds
PUT /api/alertas/configuracao       // Atualiza thresholds
```

---

### Módulo 6: Inteligência de Arrecadação 🧠

**O que torna o sistema INTELIGENTE**

#### Cálculos Principais:

```typescript
// 1. Giro de Estoque
giroEstoque = totalSaidasUltimos30Dias / estoqueAtual

// 2. Média de Consumo
mediaConsumoDiaria = totalSaidasUltimos30Dias / 30
mediaConsumoSemanal = mediaConsumoDiaria * 7

// 3. Ponto de Ressuprimento
pontoRessuprimento = mediaConsumoSemanal * 2  // 2 semanas de segurança

// 4. Quantidade a Arrecadar
quantidadeArrecadar = pontoRessuprimento - estoqueAtual

// 5. Prioridade de Arrecadação (Score 0-100)
prioridade = (
  (valorNutricional * 0.4) +
  (facilidadeArrecadacao * 0.2) +
  ((100 - percentualEstoque) * 0.3) +
  (perecivel ? 10 : 0)
)
```

#### Análise de Sazonalidade:

```typescript
const fatoresSazonais = {
  "2024-12": { // Dezembro
    "Arroz": 1.3,      // 30% mais consumo (festas)
    "Açúcar": 1.5,     // 50% mais consumo (doces)
    "Panetone": 3.0    // 200% mais consumo
  },
  "2024-04": { // Abril (Páscoa)
    "Chocolate": 2.0,
    "Ovos": 1.4
  }
}

quantidadeAjustada = quantidadeArrecadar * fatoresSazonais[mes][item]
```

#### Endpoints:
```typescript
GET /api/inteligencia/prioridades           // Lista ordenada por prioridade
GET /api/inteligencia/previsao-demanda      // Próximos 30 dias
GET /api/inteligencia/sugestao-campanha     // Itens para próxima campanha
POST /api/inteligencia/simular              // Simula arrecadação X
     { itemId, quantidade }
```

#### Resposta de Sugestão de Campanha:

```json
{
  "campanhasSugeridas": [
    {
      "nome": "Campanha Urgente - Itens Críticos",
      "prazo": "7 dias",
      "itens": [
        {
          "nome": "Arroz",
          "quantidadeSugerida": 150,
          "unidade": "KG",
          "criticidade": "VERMELHO",
          "impacto": "+32 cestas básicas",
          "prioridade": 95
        },
        {
          "nome": "Óleo de Soja",
          "quantidadeSugerida": 80,
          "unidade": "LITRO",
          "criticidade": "LARANJA",
          "impacto": "+40 cestas básicas",
          "prioridade": 87
        }
      ],
      "impactoTotal": "Permitirá montar 72 cestas adicionais"
    }
  ]
}
```

---

## 📱 Telas Principais do Frontend

### 1. Dashboard Principal

```
┌────────────────────────────────────────────────────────────────┐
│  📊 Dashboard - ONG Alimentar Esperança                        │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │  🎁 47    │  │  ⚠️ 12    │  │  📦 143   │  │  🚨 3     │  │
│  │  Cestas   │  │  Alertas  │  │  Itens    │  │  Críticos │  │
│  │Disponíveis│  │  Ativos   │  │  Estoque  │  │           │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
│                                                                 │
│  🎯 Para completar 50 cestas, arrecadar:                       │
│  ├─ 🟠 Arroz: 15 KG                                            │
│  ├─ 🟡 Feijão: 6 KG                                            │
│  └─ 🟡 Açúcar: 4 KG                                            │
│                                                                 │
│  📈 Gráfico: Consumo vs. Estoque (últimos 30 dias)            │
│  [Gráfico de barras aqui]                                      │
│                                                                 │
│  🚨 Itens Críticos:                                            │
│  ├─ 🔴 Arroz - 2 dias de estoque                              │
│  ├─ 🟠 Óleo - 5 dias de estoque                               │
│  └─ 🟠 Leite em Pó - 6 dias de estoque                        │
│                                                                 │
│  [Gerar Campanha]  [Ver Todos os Alertas]                     │
└────────────────────────────────────────────────────────────────┘
```

### 2. Calculadora de Cestas

```
┌────────────────────────────────────────────────────────────────┐
│  🎁 Calculadora de Cestas Básicas                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Tipo de Cesta: [Cesta Básica Padrão ▼]                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Composição da Cesta:                                     │ │
│  │  ✓ Arroz (5 KG)         Estoque: 235 KG → 47 cestas      │ │
│  │  ✓ Feijão (2 KG)        Estoque: 94 KG  → 47 cestas      │ │
│  │  ✓ Açúcar (2 KG)        Estoque: 96 KG  → 48 cestas      │ │
│  │  ✓ Óleo (2 L)           Estoque: 95 L   → 47 cestas      │ │
│  │  ✓ Sal (1 KG)           Estoque: 78 KG  → 78 cestas      │ │
│  │  ✓ Café (0.5 KG)        Estoque: 28 KG  → 56 cestas      │ │
│  │  ✓ Macarrão (2 KG)      Estoque: 105 KG → 52 cestas      │ │
│  │  ⊘ Farinha (1 KG)       Estoque: 45 KG  → 45 cestas      │ │
│  │  ⊘ Leite Pó (0.4 KG)    Estoque: 15 KG  → 37 cestas      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🎁 Você pode montar: 47 CESTAS COMPLETAS                      │
│                                                                 │
│  Para completar 50 cestas:                                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Item      │ Falta │ Estoque │ Meta  │ Criticidade       │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Arroz     │ 15 KG │ 235 KG  │ 250KG │ 🟠 Urgente       │ │
│  │  Feijão    │ 6 KG  │ 94 KG   │ 100KG │ 🟡 Moderado      │ │
│  │  Açúcar    │ 4 KG  │ 96 KG   │ 100KG │ 🟡 Moderado      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [Montar Cestas]  [Gerar Lista de Arrecadação]                │
└────────────────────────────────────────────────────────────────┘
```

### 3. Gestão de Estoque

```
┌────────────────────────────────────────────────────────────────┐
│  📦 Gestão de Estoque                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Filtros: [Categoria ▼] [Criticidade ▼] [🔍 Buscar]          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Item        │Qtd│ Un │Status│Validade│ Dias  │Ações     │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │🔴 Arroz     │235│ KG │ 🔴   │   -    │ 2d    │[+][-][✏]│ │
│  │🟠 Óleo Soja │ 95│ L  │ 🟠   │30/06/25│ 5d    │[+][-][✏]│ │
│  │🟡 Feijão    │ 94│ KG │ 🟡   │   -    │ 7d    │[+][-][✏]│ │
│  │🟢 Sal       │ 78│ KG │ 🟢   │   -    │ 39d   │[+][-][✏]│ │
│  │🟢 Café      │ 28│ KG │ 🟢   │15/08/25│ 28d   │[+][-][✏]│ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [+ Novo Item]  [Registrar Entrada]  [Registrar Saída]        │
└────────────────────────────────────────────────────────────────┘
```

### 4. Prioridades de Arrecadação

```
┌────────────────────────────────────────────────────────────────┐
│  🎯 Inteligência de Arrecadação                                │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 Próxima Campanha Sugerida: Campanha Urgente (7 dias)      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Prioridade │ Item      │ Arrecadar │ Impacto            │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ 🔴 95      │ Arroz     │ 150 KG    │ +30 cestas         │ │
│  │ 🟠 87      │ Óleo      │ 80 L      │ +40 cestas         │ │
│  │ 🟠 82      │ Leite Pó  │ 20 KG     │ +50 cestas         │ │
│  │ 🟡 68      │ Açúcar    │ 40 KG     │ +20 cestas         │ │
│  │ 🟡 65      │ Macarrão  │ 30 KG     │ +15 cestas         │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  💡 Impacto Total: Com estes itens você montará +155 cestas   │
│                                                                 │
│  📊 Análise de Sazonalidade:                                   │
│  • Dezembro se aproxima: consumo de açúcar aumenta 50%         │
│  • Considere arrecadar panetones e chocolates                  │
│                                                                 │
│  [Gerar Lista PDF]  [Compartilhar Campanha]  [Simular]        │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Componentes React Principais

### CalculadoraCestas.tsx
```typescript
interface CestaCalculada {
  cestasDisponiveis: number;
  itensFaltantes: ItemFaltante[];
  projecoes: Projecao[];
}

const CalculadoraCestas: React.FC = () => {
  const [composicao, setComposicao] = useState<ComposicaoCesta | null>(null);
  const [resultado, setResultado] = useState<CestaCalculada | null>(null);
  
  useEffect(() => {
    calcularCestas();
  }, [composicao]);
  
  return (
    <Card>
      <CardHeader>
        <h2>🎁 Cestas Disponíveis: {resultado?.cestasDisponiveis}</h2>
      </CardHeader>
      <CardBody>
        <ComposicaoVisualizer itens={composicao?.itens} />
        <ItensFaltantesTable itens={resultado?.itensFaltantes} />
        <ProjecoesChart projecoes={resultado?.projecoes} />
      </CardBody>
    </Card>
  );
};
```

### AlertasCriticos.tsx
```typescript
const AlertasCriticos: React.FC = () => {
  const { data: alertas } = useQuery('alertas-criticos', fetchAlertas);
  
  return (
    <AlertList>
      {alertas?.map(alerta => (
        <AlertItem
          key={alerta.id}
          nivel={alerta.nivel}
          mensagem={alerta.mensagem}
          item={alerta.item}
          acoes={[
            { label: "Resolver", onClick: () => resolverAlerta(alerta.id) },
            { label: "Arrecadar", onClick: () => criarCampanha(alerta.itemId) }
          ]}
        />
      ))}
    </AlertList>
  );
};
```

---

## 🔄 Fluxos de Trabalho

### Fluxo 1: Recebimento de Doação
```
1. Voluntário acessa "Registrar Entrada"
2. Seleciona itens e quantidades
3. Preenche origem (doador/campanha)
4. Sistema:
   - Atualiza estoque
   - Recalcula dias de estoque
   - Atualiza status de alertas
   - Recalcula cestas disponíveis
5. Gera comprovante para doador
```

### Fluxo 2: Montagem de Cesta
```
1. Voluntário acessa "Montar Cestas"
2. Seleciona tipo de cesta
3. Sistema mostra composição e disponibilidade
4. Voluntário confirma montagem
5. Sistema:
   - Registra saída de cada item
   - Atualiza estoque
   - Decrementa contador de cestas
   - Gera etiqueta/recibo
```

### Fluxo 3: Campanha de Arrecadação
```
1. Sistema detecta item crítico
2. Gera alerta automático
3. Gestor acessa "Prioridades"
4. Sistema sugere itens e quantidades
5. Gestor gera lista em PDF
6. Compartilha em redes sociais
7. Doações começam a entrar
8. Sistema monitora progresso em tempo real
```

---

## 🚀 Roadmap de Desenvolvimento

### Fase 1: MVP (4-6 semanas)
- ✅ Estrutura básica do backend (NestJS)
- ✅ CRUD de alimentos
- ✅ Controle de estoque simples
- ✅ Registro de movimentações
- ✅ Dashboard básico no React
- ✅ Calculadora de cestas (versão 1.0)

### Fase 2: Inteligência (3-4 semanas)
- ✅ Sistema de alertas
- ✅ Cálculo de prioridades
- ✅ Giro de estoque
- ✅ Previsão de demanda
- ✅ Sugestão de campanhas

### Fase 3: Expansão (2-3 semanas)
- ✅ Gestão de roupas
- ✅ Gestão de brinquedos
- ✅ Itens de higiene
- ✅ Categorização avançada

### Fase 4: Otimizações (Contínuo)
- 📊 Análise de sazonalidade
- 🔔 Notificações por email/WhatsApp
- 📱 App mobile
- 🤝 Integração com redes sociais
- 📈 Relatórios avançados
- 🎯 ML para previsão de demanda

---

## 🛠️ Tecnologias Recomendadas

### Backend
- **Framework:** NestJS 10+
- **ORM:** Prisma ou TypeORM
- **Banco de Dados:** PostgreSQL 14+
- **Validação:** class-validator, class-transformer
- **Documentação:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18+ com TypeScript
- **State Management:** React Query + Zustand
- **Gráficos:** Recharts ou Chart.js
- **UI:** Tailwind CSS + shadcn/ui
- **Formulários:** React Hook Form + Zod

### Infraestrutura
- **Containerização:** Docker
- **Deploy:** Vercel (frontend) + Railway/Render (backend)
- **CI/CD:** GitHub Actions

---

## 📖 Bibliotecas Úteis

```json
{
  "backend": [
    "@nestjs/core",
    "@nestjs/typeorm",
    "prisma",
    "class-validator",
    "date-fns",
    "@nestjs/schedule",  // Para cron jobs de alertas
    "nodemailer"         // Para notificações
  ],
  "frontend": [
    "react",
    "react-query",
    "recharts",
    "date-fns",
    "react-hook-form",
    "zod",
    "lucide-react",
    "@tanstack/react-table"  // Para tabelas complexas
  ]
}
```

---

## 🎯 Métricas de Sucesso

1. **Redução de Desperdício:** < 5% de alimentos vencidos
2. **Tempo de Resposta:** Alerta → Arrecadação < 7 dias
3. **Eficiência:** 95% das cestas montadas são composições padrão
4. **Satisfação:** NPS > 8 entre voluntários
5. **Impacto:** +30% de famílias atendidas no primeiro ano

---

## 📞 Próximos Passos

1. **Validar conceito** com gestores de ONGs
2. **Prototipar** telas principais no Figma
3. **Desenvolver MVP** focado em alimentos e cestas
4. **Testar** com ONG piloto por 30 dias
5. **Iterar** baseado em feedback real
6. **Escalar** para outras ONGs

---

## 🤝 Contribuindo

Este é um projeto open-source com propósito social. Contribuições são muito bem-vindas!

**Áreas que precisam de ajuda:**
- 🎨 Design/UX
- 💻 Desenvolvimento frontend
- 🔧 Desenvolvimento backend
- 📊 Ciência de dados (ML para previsões)
- 📝 Documentação
- 🧪 Testes

---

## 📄 Licença

MIT License - Livre para uso em ONGs sem fins lucrativos

---

**Desenvolvido com ❤️ para fazer a diferença no combate à fome no Brasil**
