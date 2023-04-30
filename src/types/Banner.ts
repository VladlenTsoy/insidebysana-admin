export interface Banner {
    id: number
    title: string
    url_image: string
    url_image_mobile: string
    button_title: string
    button_link: string
}

export interface CreateBannerType {
    title: Banner["title"]
    image: Banner["url_image"]
    image_mobile: Banner["url_image_mobile"]
    button_title: Banner["button_title"]
    button_link: Banner["button_link"]
}

export interface EditBannerType {
    id: Banner["id"]
    data: {
        title: Banner["title"]
        url_image: Banner["url_image"]
        url_image_mobile: Banner["url_image_mobile"]
        button_title: Banner["button_title"]
        button_link: Banner["button_link"]
    }
}
