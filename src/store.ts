import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"
import app from "./features/app/appSlice"
import user from "./features/user/userSlice"
// import color from "./store/admin/color/colorSlice"
import size from "./features/size/sizeSlice"
import tag from "./features/tag/tagSlice"
// import category from "./store/common/category/categorySlice"
// import product from "./store/admin/product/productSlice"
// import client from "./store/admin/client/clientSlice"
import source from "./features/source/sourceSlice"
// import productColor from "./store/admin/product-color/productColorSlice"
// import banner from "./store/admin/banner/bannerSlice"
import additionalService from "features/additional-service/additionalServiceSlice"
import status from "./features/status/statusSlice"
import order from "./features/order/orderSlice"
// import staff from "./store/admin/staff/staffSlice"
import paymentMethod from "./features/payment-method/paymentMethodSlice"
// import print from "./store/admin/product-color-print-image/productColorPrintSlice"
// import lookbook from "./store/admin/lookbook/lookbookSlice"
// import lookbookCategory from "./store/admin/lookbook/lookbookCategorySlice"
import orderArchive from "./features/order/order-archive/orderArchiveSlice"
// import newsletter from "./store/admin/newsletter/newsletterSlice"
// import promoCode from "./store/admin/promo-code/promoCodeSlice"
// import printCategory from "./store/admin/print-category/printCategorySlice"
// import printImage from "./store/admin/print-image/printImageSlice"
// import printProduct from "./store/admin/print-product/printProductSlice"
// import productColorImage from "./store/admin/product-color-image/productColorImageSlice"
// import trashProductColor from "lib/components/trash-products/trashProductColorSlice"
// import homeProduct from "./pages/user/admin/pages/settings/home/homeProductSlice"
import {productApi} from "features/product/productApi"
import {categoryApi} from "features/category/categoryApi"
import {colorApi} from "features/color/colorApi"
import {sizeApi} from "features/size/sizeApi"
import {tagApi} from "features/tag/tagApi"
import {homePositionApi} from "features/home-position/homePositionApi"
import {photoApi} from "./features/photos-section/photoApi"

export type StoreState = ReturnType<typeof adminReducer>

export const adminReducer = combineReducers({
    app,
    user,
    // category,
    size,
    // color,
    additionalService,
    tag,
    // product,
    // client,
    source,
    // productColor,
    // banner,
    status,
    order,
    // staff,
    paymentMethod,
    // print,
    // lookbook,
    // newsletter,
    // promoCode,
    // productColorImage,
    // trashProductColor,
    orderArchive,
    // printCategory,
    // printImage,
    // printProduct,
    // homeProduct,
    // lookbookCategory,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [homePositionApi.reducerPath]: homePositionApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer
})

export type AppDispatch = typeof store.dispatch

export interface AppThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}

export const useDispatch = () => useStoreDispatch<any>()

export const store = configureStore({
    reducer: adminReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({immutableCheck: false})
            .concat(productApi.middleware)
            .concat(categoryApi.middleware)
            .concat(colorApi.middleware)
            .concat(sizeApi.middleware)
            .concat(tagApi.middleware)
            .concat(homePositionApi.middleware)
            .concat(photoApi.middleware)

})
