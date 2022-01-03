import {createSlice, createEntityAdapter} from "@reduxjs/toolkit"
import {createSize} from "features/size/createSize"
import {displaySize} from "features/size/displaySize"
import {deleteSize} from "features/size/deleteSize"
import {editSize} from "features/size/editSize"
import {hideSize} from "features/size/hideSize"
import {Size} from "types/Size"
import {StoreState} from "store"
import {fetchSizes} from "./fetchSizes"

export const sizeAdapter = createEntityAdapter<Size>()

export interface StateProps {
    loading: boolean
}

const initialState = sizeAdapter.getInitialState<StateProps>({
    loading: true
})

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод всех цветов
        builder.addCase(fetchSizes.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchSizes.fulfilled, (state, action) => {
            sizeAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchSizes.rejected, state => {
            state.loading = false
        })

        //
        builder.addCase(createSize.fulfilled, (state, action) => {
            sizeAdapter.addOne(state, action.payload)
        })
        //
        builder.addCase(editSize.fulfilled, (state, action) => {
            sizeAdapter.setOne(state, action.payload)
        })

        // Удаление
        builder.addCase(deleteSize.fulfilled, (state, action) => {
            sizeAdapter.removeOne(state, action.payload)
        })
        // Скрыть
        builder.addCase(hideSize.fulfilled, (state, action) => {
            sizeAdapter.updateOne(state, {id: action.payload, changes: {hide_id: 1}})
        })
        // Вернуть
        builder.addCase(displaySize.fulfilled, (state, action) => {
            sizeAdapter.updateOne(state, {id: action.payload, changes: {hide_id: null}})
        })
    }
})

export const {selectById: getSizeById, selectAll: selectAllSizes} = sizeAdapter.getSelectors<StoreState>(
    state => state.size
)

export default sizeSlice.reducer
