export interface PrintCategory {
    id: number
    title: string
    hide_id?: number
    sub_categories: PrintSubCategory[]
}

export interface PrintSubCategory {
    id: number
    title: string
    category_id: number
    hide_id?: number
}

export interface CreatePrintCategoryType {
    title: PrintCategory["title"]
    category_id?: PrintCategory["id"]
}

export interface EditPrintCategoryType {
    id: PrintCategory["id"]
    data: {
        title: PrintCategory["title"]
        category_id?: PrintCategory["id"]
    }
}
