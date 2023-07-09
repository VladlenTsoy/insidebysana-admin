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
  pagination: { current: number, pageSize: number }
  search: string
  sorter: { field: string, order: "ascend" | "descend" }
}

export interface IClientOrder {
  id: number
  total_price: number
  created_at: string
  payment_state: number
  payments?: {
    payment_id: number
    price: number
    title: string
  }
  user?: {
    id: number
    full_name: string
  }
  status?: {
    id: number
    title: string
  }
}

export interface IClientCart {
  id: string
  thumbnail: string
  title: string
  category_id: number
  price: number
  discount?: {
    type: string
    discount: number
  }
  color?: {
    id: number
    title: string
    hex: string
  }
  sku: string
  qty: number
  size?: {
    id: number
    title: string
    qty: number
  }
  url_thumbnail: string
}

export interface IClientWishlist {
  id: number
  thumbnail: string
  title: string
  category_id: number
  price: number
  discount?: {
    type: string
    discount: number
  }
  color?: {
    id: number
    title: string
    hex: string
  }
  url_thumbnail: string
}