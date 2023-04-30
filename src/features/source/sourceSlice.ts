import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Source} from "types/Source"
import {StoreState} from "store"
import {fetchSources} from "./fetchSources"

export const sourceAdapter = createEntityAdapter<Source>()

export interface StateProps {
    loading: boolean;
}

const initialState = sourceAdapter.getInitialState<StateProps>({
    loading: true
})

const sourceSlice = createSlice({
    name: "source",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Вывод всех ресурсов
        builder.addCase(fetchSources.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchSources.fulfilled, (state, action) => {
            sourceAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchSources.rejected, state => {
            state.loading = false
        })
    }
})

export const {selectById: getSourceById, selectAll: selectAllSources} = sourceAdapter.getSelectors<StoreState>(
    state => state.source
)

export default sourceSlice.reducer
