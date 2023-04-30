export interface LookbookCategory {
    id: number
    title: string
    url_image: string
}

export interface Lookbook {
    id: number
    url_image: string
    position: number
    category_id: number
    created_at: string
}

export interface CreateLookbookCategoryType {
    title: LookbookCategory["title"]
    image: LookbookCategory["url_image"]
}

export interface EditLookbookCategoryType {
    id: LookbookCategory["id"]
    data: {
        title: LookbookCategory["title"]
        url_image: LookbookCategory["url_image"]
    }
}

export interface CreateLookbookType {
    image: Lookbook["url_image"]
    position: Lookbook["position"]
    category_id: Lookbook["category_id"]
}

export interface EditLookbookType {
    id: Lookbook["id"]
    data: {
        url_image: Lookbook["url_image"]
        position: Lookbook["position"]
        category_id: Lookbook["category_id"]
    }
}
