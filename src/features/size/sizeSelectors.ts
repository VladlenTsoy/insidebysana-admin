import {useSelector} from "react-redux"
import {selectAllSizes, getSizeById} from "./sizeSlice"
import {StoreState} from "store"
import {Size} from "types/Size"

// Загрузка
export const useLoadingSizes = () => useSelector((state: StoreState) => state.size.loading)

// Вывод всех цветов
export const useSelectAllSizes = () => useSelector(selectAllSizes)

export const useSelectSizeById = (id: Size["id"]) =>
    useSelector((state: StoreState) => getSizeById(state, id))
