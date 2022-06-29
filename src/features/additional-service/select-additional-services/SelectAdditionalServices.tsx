import React, {SetStateAction, Dispatch, useEffect, useCallback} from "react"
import styles from "./SelectAdditionalServices.module.less"
import {useDispatch} from "store"
import {fetchAdditionalServices} from "../fetchAdditionalServices"
import {useLoadingAdditionalServices, useSelectAllAdditionalServices} from "../additionalServiceSlice"
import {MinusOutlined, PlusOutlined} from "@ant-design/icons"
import {formatPrice} from "utils/formatPrice"
import {Button, Typography} from "antd"
import LoadingBlock from "components/loading-block/LoadingBlock"
import {AdditionalService} from "types/AdditionalService"

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

    const onClickMinusHandler = useCallback((additionalService: AdditionalService) => {
        let _selectAdditionalServices = selectAdditionalServices
        const checkAdditionalService = selectAdditionalServices.find(
            _additionalService => _additionalService.id === additionalService.id
        )
        if (checkAdditionalService) {
            if (checkAdditionalService.qty > 1)
                _selectAdditionalServices = selectAdditionalServices.map(_additionalService => {
                    if (additionalService.id === _additionalService.id) _additionalService.qty -= 1
                    return _additionalService
                })
            else
                _selectAdditionalServices = selectAdditionalServices.filter(_additionalService => additionalService.id !== _additionalService.id)
        }
        updateSelectAdditionalServices(_selectAdditionalServices)
    }, [updateSelectAdditionalServices, selectAdditionalServices])

    const onClickPlusHandler = useCallback((additionalService: AdditionalService) => {
        const checkAdditionalService = selectAdditionalServices.find(
            _additionalService => _additionalService.id === additionalService.id
        )
        if (checkAdditionalService)
            updateSelectAdditionalServices(
                selectAdditionalServices.map(_additionalService => {
                    if (additionalService.id === _additionalService.id) _additionalService.qty += 1
                    return _additionalService
                })
            )
        else updateSelectAdditionalServices(
            [...selectAdditionalServices, {...additionalService, qty: 1}]
        )
    }, [updateSelectAdditionalServices, selectAdditionalServices])

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
                    {additionalServices.map(additionalService => (
                        <div className={styles.additionalService} key={additionalService.id}>
                            <div className={styles.title}>{additionalService.title}</div>
                            <div className={styles.price}>{formatPrice(additionalService.price)} сум</div>
                            <div className={styles.actions}>
                                <div className={styles.minus}>
                                    <Button
                                        type="primary"
                                        className="blue"
                                        shape="circle"
                                        size="large"
                                        icon={<MinusOutlined />}
                                        onClick={() => onClickMinusHandler(additionalService)}
                                    />
                                </div>
                                <div className={styles.count}>
                                    {selectAdditionalServices.find(selectAdditionalService => selectAdditionalService.id === additionalService.id)?.qty || 0}
                                </div>
                                <div className={styles.plus}>
                                    <Button
                                        type="primary"
                                        className="blue"
                                        shape="circle"
                                        size="large"
                                        icon={<PlusOutlined />}
                                        onClick={() => onClickPlusHandler(additionalService)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default SelectAdditionalServices
