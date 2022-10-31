import React, {Dispatch, SetStateAction, useCallback} from "react"
import styles from "./SelectAdditionalServices.module.less"
import {formatPrice} from "utils/formatPrice"
import Counter from "components/counter/Counter"
import {AdditionalService} from "types/AdditionalService"
import {SelectAdditionalServiceType} from "./SelectAdditionalServices"

interface OptionAdditionalServiceProps {
    additionalService: AdditionalService;
    selectAdditionalServices: SelectAdditionalServiceType[]
    updateSelectAdditionalServices: Dispatch<SetStateAction<SelectAdditionalServiceType[]>>
}

const OptionAdditionalService: React.FC<OptionAdditionalServiceProps> = (
    {
        additionalService,
        selectAdditionalServices,
        updateSelectAdditionalServices
    }
) => {
    const onChangeHandler = useCallback(val => {
        // Поиск в добавленных
        const checkAdditionalService = selectAdditionalServices.find(
            _additionalService => _additionalService.id === additionalService.id
        )
        // Если уже добавлен
        if (checkAdditionalService) {
            if (val <= 1) {
                updateSelectAdditionalServices(
                    selectAdditionalServices.filter(
                        _additionalService => additionalService.id !== _additionalService.id
                    )
                )
            } else
                // Изменить кол-во
                updateSelectAdditionalServices(
                    selectAdditionalServices.map(_additionalService => {
                        if (additionalService.id === _additionalService.id) _additionalService.qty = val
                        return _additionalService
                    })
                )
        } else if (val > 0) {
            updateSelectAdditionalServices([...selectAdditionalServices, {...additionalService, qty: val}])
        }
    }, [additionalService, selectAdditionalServices, updateSelectAdditionalServices])

    return (
        <div className={styles.additionalService} key={additionalService.id}>
            <div className={styles.title}>{additionalService.title}</div>
            <div className={styles.price}>{formatPrice(additionalService.price)} сум</div>
            <Counter onChange={onChangeHandler} />
        </div>
    )
}

export default OptionAdditionalService
