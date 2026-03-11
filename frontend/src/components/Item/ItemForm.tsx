// src/pages/items/components/ItemForm.tsx
import { useState, useEffect } from "react";
import { Categoria, type CreateItemDto, type Item } from "../../types";

interface Props {
  itemParaEditar?: Item | null;
  onSubmit: (dto: CreateItemDto) => void;
  onCancel: () => void;
}

const categorias = [
  { value: Categoria.ALIMENTO, label: "Alimento" },
  { value: Categoria.ROUPA, label: "Roupa" },
  { value: Categoria.HIGIENE, label: "Higiene" },
  { value: Categoria.BRINQUEDO, label: "Brinquedo" },
  { value: Categoria.LIMPEZA, label: "Limpeza" },
  { value: Categoria.OUTRO, label: "Outro" },
];

const unidades = ["kg", "g", "un", "L", "ml", "par", "cx", "pct"];

const estadoInicial: CreateItemDto = {
  nome: "",
  categoria: Categoria.ALIMENTO,
  unidadeMedida: "un",
  quantidadeMinima: 0,
};

export default function ItemForm({
  itemParaEditar,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<CreateItemDto>(estadoInicial);

  useEffect(() => {
    if (itemParaEditar) {
      setForm({
        nome: itemParaEditar.nome,
        categoria: itemParaEditar.categoria,
        unidadeMedida: itemParaEditar.unidadeMedida,
        quantidadeMinima: itemParaEditar.quantidadeMinima,
      });
    } else {
      setForm(estadoInicial);
    }
  }, [itemParaEditar]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: name === "quantidadeMinima" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div>
      <div>
        <h2>{itemParaEditar ? "Editar Item" : "Novo Item"}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nome */}
          <div>
            <label>Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Arroz, Feijão..."
            />
          </div>

          {/* Categoria */}
          <div>
            <label>Categoria</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
            >
              {categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Unidade de medida */}
          <div>
            <label>Unidade de Medida</label>
            <select
              name="unidadeMedida"
              value={form.unidadeMedida}
              onChange={handleChange}
            >
              {unidades.map((un) => (
                <option key={un} value={un}>
                  {un}
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade mínima */}
          <div>
            <label>Quantidade Mínima</label>
            <input
              name="quantidadeMinima"
              type="number"
              min={0}
              value={form.quantidadeMinima}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botões */}
          <div>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit">
              {itemParaEditar ? "Salvar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
