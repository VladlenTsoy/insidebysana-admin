import {CheckOutlined, FilterOutlined} from "@ant-design/icons"
import LoadingBlock from "components/loading-block/LoadingBlock"
import {Button, Drawer} from "antd"
import {AnimatePresence, motion} from "framer-motion"
import React, {useEffect, useState} from "react"
import {Size} from "types/Size"
import {Category} from "types/Category"
import styles from "./FilterButton.module.less"
import cn from "classnames"

const MotionCheckAnimation: React.FC = ({children}) => {
    return (
        <motion.span
            animate={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: -20}}
            exit={{opacity: 0, x: -20}}
            key="icon"
        >
            {children}
        </motion.span>
    )
}

interface FilterButtonProps {
    sizes?: Size[]
    categories?: Category[]
    onCategories: (categoryId?: number) => void
    onSizes: (sizeId?: number) => void
    categoryIds: number[]
    sizeIds: number[]
    isLoadingCategories: boolean
    isLoadingSizes: boolean
}

const FilterButton: React.FC<FilterButtonProps> = (
    {
        onCategories,
        onSizes,
        categoryIds,
        sizeIds,
        categories,
        sizes,
        isLoadingCategories,
        isLoadingSizes
    }
) => {
    const [visible, setVisible] = useState(false)
    // Фильтрация категории
    const changeCategoryHandler = (categoryId?: number) =>
        onCategories(categoryId ? (categoryId) : undefined)
    // Фильтрация размеров
    const changeSizeHandler = (sizeId?: number) => onSizes(sizeId ? (sizeId) : undefined)
    // Сбросить фильтрацию
    const resetHandler = () => {
        onCategories(undefined)
        onSizes(undefined)
    }
    // Отрыть фильтрацию
    const onClickHandler = () => setVisible(true)
    // Закрыть
    const close = () => setVisible(false)

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden"
            return () => {
                document.body.style.overflow = "auto"
            }
        }
    }, [visible])

    return (
        <>
            <Button size="large" icon={<FilterOutlined />} onClick={onClickHandler}>
                Фильтрация
            </Button>
            <Drawer
                visible={visible}
                onClose={close}
                className={styles.drawer}
                getContainer="#site-layout-content"
                placement="left"
                headerStyle={{display: "none"}}
                style={{left: "auto"}}
                width="470"
                closeIcon={false}
                zIndex={998}
            >
                <div className={styles.filter}>
                    {isLoadingCategories || isLoadingSizes ? (
                        <LoadingBlock />
                    ) : (
                        <div className={styles.filterContainer}>
                            <div className={cn(styles.filterList, styles.categories)}>
                                <div
                                    className={
                                        cn(styles.filterItem, styles.filterItemAll, {[styles.filterItemActive]: categoryIds.length <= 0})
                                    }
                                    onClick={() => changeCategoryHandler()}
                                >
                                    <AnimatePresence>
                                        {categoryIds.length <= 0 && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                categoryIds.length <= 0
                                                    ? {x: 20, width: "calc(100% - 20px)"}
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            Все
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {categories?.map(category => (
                                    <div className={styles.filterGroup} key={category.id}>
                                        <span className={styles.titleGroup}> {category.title}</span>
                                        <div>
                                            {category.sub_categories?.map(sub => {
                                                const isFind = categoryIds.includes((sub.id))
                                                return (
                                                    <div
                                                        className={
                                                            cn(styles.filterItem, {[styles.filterItemActive]: isFind})
                                                        }
                                                        key={sub.id}
                                                        onClick={() => changeCategoryHandler(sub.id)}
                                                    >
                                                        <AnimatePresence>
                                                            {isFind && (
                                                                <MotionCheckAnimation>
                                                                    <CheckOutlined />
                                                                </MotionCheckAnimation>
                                                            )}
                                                            <motion.span
                                                                animate={
                                                                    isFind
                                                                        ? {
                                                                            x: 20,
                                                                            width: "calc(100% - 20px)"
                                                                        }
                                                                        : {x: 0, width: "100%"}
                                                                }
                                                                key="title"
                                                            >
                                                                {sub.title}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cn(styles.filterList, styles.sizes)}>
                                <div
                                    className={
                                        cn(styles.filterItem, styles.filterItemAll, {[styles.filterItemActive]: sizeIds.length <= 0})
                                    }
                                    onClick={() => changeSizeHandler()}
                                >
                                    <AnimatePresence>
                                        {sizeIds.length <= 0 && (
                                            <MotionCheckAnimation>
                                                <CheckOutlined />
                                            </MotionCheckAnimation>
                                        )}
                                        <motion.span
                                            animate={
                                                sizeIds.length <= 0
                                                    ? {x: 20, width: "calc(100% - 20px)"}
                                                    : {x: 0, width: "100%"}
                                            }
                                            key="title"
                                        >
                                            Все
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                {sizes?.map(size => {
                                    const isFind = sizeIds.includes((size.id))
                                    return (
                                        <div
                                            className={cn(styles.filterItem, {[styles.filterItemActive]: isFind})}
                                            key={size.id}
                                            onClick={() => changeSizeHandler(size.id)}
                                        >
                                            {isFind && (
                                                <MotionCheckAnimation>
                                                    <CheckOutlined />
                                                </MotionCheckAnimation>
                                            )}
                                            <motion.span
                                                animate={
                                                    isFind
                                                        ? {x: 20, width: "calc(100% - 20px)"}
                                                        : {x: 0, width: "100%"}
                                                }
                                                key="title"
                                            >
                                                {size.title}
                                            </motion.span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    <div className={styles.filterActions}>
                        <Button block size="large" onClick={resetHandler}>
                            Сбросить
                        </Button>
                        <Button type="primary" block size="large" onClick={close}>
                            Применить
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
export default FilterButton
