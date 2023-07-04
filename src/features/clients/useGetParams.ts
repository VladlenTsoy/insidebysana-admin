import {useHistory} from "react-router-dom"
import {useCallback, useEffect, useState} from "react"
import {SelectClientsFilterParams} from "types/Client"

const PAGE_CURRENT = 1
const PAGE_SIZE = 10

const selectParams = (location: any) => {
    const query = new URLSearchParams(location.search)
    const search = query.get("search") || ""
    const current = query.get("current")
        ? Number(query.get("current"))
        : PAGE_CURRENT
    const pageSize = query.get("pageSize")
        ? Number(query.get("pageSize"))
        : PAGE_SIZE

    return { search, current, pageSize, query}
}

export const useGetParams = () => {
    const history = useHistory()
    const {
        search,
        current,
        pageSize
    } = selectParams(history.location)
    const [params, setParams] = useState<SelectClientsFilterParams>({
        search: search,
        sorter: {field: "id", order: "ascend"},
        pagination: {current, pageSize}
    })

    const updateParams = useCallback(
        (key, val) => {
            const {query} = selectParams(history.location)
            switch (key) {
                case "search":
                    query.set(key, val)
                    break
                case "pagination":
                    query.set("current", JSON.stringify(val.current))
                    query.set("pageSize", JSON.stringify(val.pageSize))
                    break
            }
            history.push({
                search: query.toString()
            })
        },
        [history]
    )

    const checkParams = useCallback(location => {
        const {
            search,
            current,
            pageSize
        } = selectParams(location)
        //
        setParams({
            search: search || "",
            sorter: {field: "id", order: "ascend"},
            pagination: {
                current: current || PAGE_CURRENT,
                pageSize: pageSize || PAGE_SIZE
            }
        })
    }, [])

    useEffect(() => {
        history.listen(checkParams)
    }, [history, checkParams])

    return {params, updateParams}
}