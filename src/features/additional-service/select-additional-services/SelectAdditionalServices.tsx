import React, {Dispatch, SetStateAction, useEffect} from "react"
import styles from "./SelectAdditionalServices.module.less"
import {useDispatch} from "store"
import {fetchAdditionalServices} from "../fetchAdditionalServices"
import {useLoadingAdditionalServices, useSelectAllAdditionalServices} from "../additionalServiceSlice"
import {Typography} from "antd"
import LoadingBlock from "components/loading-block/LoadingBlock"
import OptionAdditionalService from "./OptionAdditionalService"

const {Title} = Typography

export interface SelectAdditionalServiceType {
    id: number
    title: string
    price: number
    qty: number
}

interface SelectAdditionalServiceProps {
    selectAdditionalServices: SelectAdditionalServiceType[]
    updateSelectAdditionalServices: Dispatch<SetStateAction<SelectAdditionalServiceType[]>>
}

const SelectAdditionalServices: React.FC<SelectAdditionalServiceProps> = (
    {
        selectAdditionalServices,
        updateSelectAdditionalServices
    }
) => {
    const loading = useLoadingAdditionalServices()
    const additionalServices = useSelectAllAdditionalServices()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAdditionalServices())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <Title level={3}>Дополнительные услуги</Title>
            {loading ? (
                <LoadingBlock />
            ) : (
                <div className={styles.container}>
                    {
                        additionalServices.map(additionalService =>
                            <OptionAdditionalService
                                additionalService={additionalService}
                                key={additionalService.id}
                                selectAdditionalServices={selectAdditionalServices}
                                updateSelectAdditionalServices={updateSelectAdditionalServices}
                            />
                        )
                    }
                </div>
            )}
        </>
    )
}

export default SelectAdditionalServices
