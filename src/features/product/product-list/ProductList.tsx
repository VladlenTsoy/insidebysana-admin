import React, {useCallback, useEffect} from "react"
import {Table} from "antd"
import {useGetAllProductsMutation} from "../productApi"
import "./ProductList.less"
import {columns} from "./Columns"
import Header from "./header/Header"
import {useGetParams} from "../useGetParams"

const ProductList: React.FC = () => {
    const {params, updateParams} = useGetParams()
    const [fetchProductColors, {isLoading, data}] = useGetAllProductsMutation()

    const onChangeHandler = (pagination: any) =>
        updateParams("pagination", pagination)

    let timeout: any
    const onSearchHandler = (e: any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => updateParams("search", e.target.value), 300)
    }

    const onCategoryIdsHandler = useCallback(
        (categoryId?: number) => updateParams("categoryIds", categoryId),
        [updateParams]
    )

    const onSizeIdsHandler = useCallback(
        (sizeId?: number) => updateParams("sizeIds", sizeId),
        [updateParams]
    )

    useEffect(() => {
        const promise = fetchProductColors(params)
        return () => {
            promise.abort()
        }
    }, [fetchProductColors, params])

    return (
        <>
            <div className="product-list-container">
                <Header
                    search={params.search}
                    onSearch={onSearchHandler}
                    categoryIds={params.categoryIds}
                    sizeIds={params.sizeIds}
                    onCategories={onCategoryIdsHandler}
                    onSizes={onSizeIdsHandler}
                />
                <Table
                    size="small"
                    loading={isLoading}
                    showHeader={false}
                    rowKey="id"
                    scroll={{x: true}}
                    dataSource={data ? data.results : []}
                    columns={columns}
                    onChange={onChangeHandler}
                    pagination={{
                        ...params.pagination,
                        total: data?.total || 0,
                        size: "default"
                    }}
                    rowClassName="row-product"
                />
            </div>
        </>
    )
}

export default ProductList
