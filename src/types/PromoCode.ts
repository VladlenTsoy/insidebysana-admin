export interface PromoCode {
    id: number
    code: string
    type: "percent" | "fixed"
    discount: number
    status: "active" | "inactive"
    client_id: number
    end_at: string
}

export interface CreatePromoCodeType {

}

export interface EditPromoCodeType {
    data: any
    id: PromoCode["id"]
}
