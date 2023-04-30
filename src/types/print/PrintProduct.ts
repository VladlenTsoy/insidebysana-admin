export interface PrintProduct {
    id: number
    title: string
    product_color_id: number
    print_image_id: number
    url_image: string
    url_thumbnail: string
    product_color: {
        id: number
        title: string
        color_title: string
    }
}

export interface CreatePrintProductType {
    title: PrintProduct["title"]
    url_image: PrintProduct["url_image"]
    product_color_id: PrintProduct["product_color_id"]
    print_image_id: PrintProduct["print_image_id"]
}

export interface EditPrintProductType {
    id: PrintProduct["id"]
    data: {
        title: PrintProduct["title"]
        url_image: PrintProduct["url_image"]
        product_color_id: PrintProduct["product_color_id"]
        print_image_id: PrintProduct["print_image_id"]
    }
}
