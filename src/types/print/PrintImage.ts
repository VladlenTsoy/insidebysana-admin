export interface PrintImage {
    id: number
    title: string
    price: number
    url_image: string
    url_thumbnail: string
    category: {
        id: number
        title: string
    }
}

export interface CreatePrintImageType {
    title: PrintImage["title"]
    price: PrintImage["price"]
    category_id: PrintImage["category"]["id"]
    url_image: PrintImage["url_image"]
}

export interface EditPrintImageType {
    id: PrintImage["id"]
    data: {
        title: PrintImage["title"]
        price: PrintImage["price"]
        category_id: PrintImage["category"]["id"]
        url_image: PrintImage["url_image"]
    }
}
