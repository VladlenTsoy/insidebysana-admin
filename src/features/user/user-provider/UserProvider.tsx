import React, {useEffect} from 'react';
import {fetchUser} from "features/user/user-provider/fetchUser";
import Loader from "components/loader/Loader";
import {useDispatch} from "store";
import {useUser} from "hooks/use-user";

const UserProvider: React.FC = ({children}) => {
    const {token, loading} = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchUser())
        return () => {
            promise.abort()
        }
    }, [dispatch, token]);

    if (loading)
        return <Loader text={`Загрузка пользователя...`}/>

    return <>{children}</>
};

export default UserProvider;