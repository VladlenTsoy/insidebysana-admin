export interface Color {
    id: number
    title: string
    hex: string
    hide_id: number | null
}

export interface CreateColorType {
    title: Color['title']
    hex: Color['hex']
}

export interface EditColorType {
    id: number
    data: {
        title: Color["title"]
        hex: Color["hex"]
    }
}
