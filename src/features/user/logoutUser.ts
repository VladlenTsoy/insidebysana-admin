import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "utils/api";
import {AppThunkProps} from "store";

interface ReturnedType {
    status: "success"
}

export const logoutUser = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    'user/logout',
    async (_, {signal}) => {
        return await apiRequest('delete', `logout`, {signal, });
    },
);