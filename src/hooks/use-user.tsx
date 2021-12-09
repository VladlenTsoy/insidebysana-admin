import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {userSelector} from "features/user/userSlice"
import {logoutUser} from "features/user/logoutUser"
import {QuestionCircleOutlined} from "@ant-design/icons"
import {Modal} from "antd"
import {useCallback} from "react"
import {User} from "types/User"

const {confirm} = Modal

type Props = () => {
    userId: User["id"] | undefined,
    user: User | null,
    updateUser: (data: any) => void,
    logout: () => void,
    token: string | null,
    loading: boolean
}

export const useUser: Props = () => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const updateUser = () => {
    }

    // Выход
    const logout = useCallback(() => {
        confirm({
            zIndex: 1002,
            title: "Вы действительно хотите выйти?",
            icon: <QuestionCircleOutlined />,
            onOk: async () => {
                dispatch(logoutUser())
            }
        })
    }, [dispatch])

    return {
        userId: user.detail?.id,
        user: user.detail,
        updateUser,
        logout,
        token: user.token,
        loading: user.loading
    }
}