import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Delivery} from "types/Delivery"
import {StoreState} from "store"
import {fetchDeliveryTypes} from "./fetchDeliveryTypes"
import {useSelector} from "react-redux"


export const typeDeliveryAdapter = createEntityAdapter<Delivery>()

export interface StateProps {
    loading: boolean
}

const initialState = typeDeliveryAdapter.getInitialState<StateProps>({
    loading: false
})

const typeDeliverySlice = createSlice({
    name: "type-delivery",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchDeliveryTypes.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchDeliveryTypes.fulfilled, (state, action) => {
            typeDeliveryAdapter.setMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchDeliveryTypes.rejected, state => {
            state.loading = false
        })
    }
})

const {selectAll} = typeDeliveryAdapter.getSelectors<StoreState>(state => state.typeDelivery)

export const useSelectDeliveryTypes = () => useSelector(selectAll)

export default typeDeliverySlice.reducer
