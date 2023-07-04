import { Source } from "./Source";

export interface Client {
  id: number
  source_id: number
  full_name: string
  phone: string
  email: string
  instagram: string
  facebook: string
  telegram: string
  date_of_birth: string
  source: Source
  created_at: string
}

export interface SelectClientsFilterParams {
  pagination: {current: number, pageSize: number}
  search: string
  sorter: {field: string, order: "ascend" | "descend"}
}