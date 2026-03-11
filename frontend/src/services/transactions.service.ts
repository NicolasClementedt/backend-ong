import api from "./api/api";
import type {
  CreateTransacaoDto,
  FilterTransacaoDto,
  Transacao,
} from "../types";

export const transactionsService = {
  async getAll(filters?: FilterTransacaoDto): Promise<Transacao[]> {
    const response = await api.get("/transactions", { params: filters });
    return response.data;
  },

  async create(dto: CreateTransacaoDto): Promise<Transacao> {
    const response = await api.post("/transactions", dto);
    return response.data;
  },
};
