import FilterButton from "./FilterButton"
import React from "react"
import Search from "./Search"
import FilterTags from "./FilterTags"
import {useGetFilterSizesQuery} from "features/size/sizeApi"
import {useGetFilterCategoriesQuery} from "features/category/categoryApi"
import styles from "./Header.module.less"

interface HeaderProps {
    onSearch: (e: any) => void
    onCategories: (categoryId?: number) => void
    onSizes: (sizeId?: number) => void
    categoryIds: number[]
    sizeIds: number[]
    search: string
}

const Header: React.FC<HeaderProps> = ({search, categoryIds, sizeIds, onSearch, onCategories, onSizes}) => {
    const {data: sizes, isLoading: isLoadingSizes} = useGetFilterSizesQuery()
    const {data: categories, isLoading: isLoadingCategories} = useGetFilterCategoriesQuery()

    return (
        <>
            <div className={styles.header}>
                <FilterButton
                    sizes={sizes}
                    categories={categories}
                    onSizes={onSizes}
                    onCategories={onCategories}
                    categoryIds={categoryIds}
                    sizeIds={sizeIds}
                    isLoadingSizes={isLoadingSizes}
                    isLoadingCategories={isLoadingCategories}
                />
                <Search search={search} onSearch={onSearch} />
            </div>
            {!!(categoryIds?.length || sizeIds?.length) && (
                <div className={styles.filterSorter}>
                    <FilterTags
                        sizes={sizes}
                        categories={categories}
                        categoryIds={categoryIds}
                        sizeIds={sizeIds}
                        isLoadingSizes={isLoadingSizes}
                        isLoadingCategories={isLoadingCategories}
                        onCategories={onCategories}
                        onSizes={onSizes}
                    />
                </div>
            )}
        </>
    )
}
export default Header
