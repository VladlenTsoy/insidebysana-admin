export interface SelloCategory {
    id: number
    title: string
    sub_categories?: SelloCategory[]
}
