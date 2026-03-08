import type { Dashboard } from "../types";
import api from "./api/api";

export const dashboardService = {
  async get(): Promise<Dashboard> {
    const response = await api.get("/dashboard");
    return response.data;
  },
};
