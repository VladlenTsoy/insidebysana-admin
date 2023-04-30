export interface Source {
    id: number
    title: string
}

export interface CreateSourceType {
    title: Source["title"]
}

export interface EditSourceType {
    id: Source["id"]
    data: {
        title: Source["title"]
    }
}
