import { useState, useEffect } from "react";
import {
  type CreateTransacaoDto,
  type Item,
  TipoTransacao,
  CategoriaDestino,
} from "../../../types";
import { itemsService } from "../../../services/items.service";
import styles from "./TransactionForm.module.css";

interface Props {
  itemPreSelecionado?: Item | null;
  onSubmit: (dto: CreateTransacaoDto) => void;
  onCancel: () => void;
}

const categoriasDestino = [
  { value: CategoriaDestino.FAMILIA, label: "Família" },
  { value: CategoriaDestino.EVENTO, label: "Evento" },
  { value: CategoriaDestino.PARCEIRO, label: "Parceiro" },
  { value: CategoriaDestino.OUTRO, label: "Outro" },
];

export default function TransactionForm({
  itemPreSelecionado,
  onSubmit,
  onCancel,
}: Props) {
  const [itens, setItens] = useState<Item[]>([]);
  const [form, setForm] = useState<CreateTransacaoDto>({
    itemId: itemPreSelecionado?.id ?? "",
    tipo: TipoTransacao.ENTRADA,
    quantidade: 0,
    observacao: "",
    categoriaDestino: undefined,
    descricaoDestino: "",
  });

  useEffect(() => {
    itemsService.getAll().then(setItens);
  }, []);

  useEffect(() => {
    if (itemPreSelecionado) {
      setForm((prev) => ({ ...prev, itemId: itemPreSelecionado.id }));
    }
  }, [itemPreSelecionado]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantidade" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      categoriaDestino:
        form.tipo === TipoTransacao.SAIDA ? form.categoriaDestino : undefined,
      descricaoDestino:
        form.tipo === TipoTransacao.SAIDA ? form.descricaoDestino : undefined,
    });
  }

  const isSaida = form.tipo === TipoTransacao.SAIDA;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Nova Movimentação</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Item</label>
            <select
              name="itemId"
              value={form.itemId}
              onChange={handleChange}
              required
              disabled={!!itemPreSelecionado}
              className={styles.select}
            >
              <option value="">Selecione um item</option>
              {itens.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome} ({item.quantidadeAtual} {item.unidadeMedida})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Tipo</label>
            <div className={styles.tipoWrapper}>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, tipo: TipoTransacao.ENTRADA }))
                }
                className={`${styles.btnTipo} ${styles.btnTipoEntrada} ${
                  form.tipo === TipoTransacao.ENTRADA ? styles.ativo : ""
                }`}
              >
                ↓ Entrada
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, tipo: TipoTransacao.SAIDA }))
                }
                className={`${styles.btnTipo} ${styles.btnTipoSaida} ${
                  form.tipo === TipoTransacao.SAIDA ? styles.ativo : ""
                }`}
              >
                ↑ Saída
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Quantidade</label>
            <input
              name="quantidade"
              type="number"
              min={1}
              value={form.quantidade}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {isSaida && (
            <>
              <div className={styles.field}>
                <label className={styles.label}>Categoria do Destino</label>
                <select
                  name="categoriaDestino"
                  value={form.categoriaDestino ?? ""}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Selecione</option>
                  {categoriasDestino.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Descrição do Destino</label>
                <input
                  name="descricaoDestino"
                  value={form.descricaoDestino ?? ""}
                  onChange={handleChange}
                  placeholder="Ex: Família Silva, Evento de Natal..."
                  className={styles.input}
                />
              </div>
            </>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Observação</label>
            <textarea
              name="observacao"
              value={form.observacao ?? ""}
              onChange={handleChange}
              rows={2}
              placeholder="Opcional..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.botoes}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.btnCancelar}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnRegistrar}>
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
