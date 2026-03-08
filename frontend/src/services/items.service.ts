import type { CreateItemDto, Item, UpdateItemDto } from "../types";
import api from "./api/api";

export const itemsService = {
  async getAll(categoria?: string): Promise<Item[]> {
    const params = categoria ? { categoria } : {};
    const response = await api.get("/items", { params });
    return response.data;
  },

  async getOne(id: string): Promise<Item> {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  async create(dto: CreateItemDto): Promise<Item> {
    const response = await api.post("/items", dto);
    return response.data;
  },

  async update(id: string, dto: UpdateItemDto): Promise<Item> {
    const response = await api.put(`/items/${id}`, dto);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/items/${id}`);
  },
};
