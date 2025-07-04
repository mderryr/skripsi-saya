import api from "@/services/api.service";
import { JenisPenyu } from "@prisma/client";
const URL = "/penyu";


export const getPenyu = async (): Promise<JenisPenyu[]> => {
  const { data } = await api.get(URL);
  return data;
};

// export const createPenyu = async (
//   JenisPenyu: JenisPenyu
// ): Promise<JenisPenyu> => {
//   const { data } = await api.post(URL, JenisPenyu);
//   return data;
// };

// export const updatePenyu = async (
//   id: number,
//   JenisPenyu: JenisPenyu
// ): Promise<JenisPenyu> => {
//   const { data } = await api.put(`${URL}/${id}`, JenisPenyu);
//   return data;
// };

// export const deletePenyu = async (id: number) => {
//   return api.delete(`${URL}/${id}`);
// };
