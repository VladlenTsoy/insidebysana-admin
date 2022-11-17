import React, {useCallback, useState} from "react"
import {Button, Drawer, Space} from "antd"
import {Status} from "types/Status"
import EditorStatus from "./EditorStatus"

interface EditorStatusActionProps {
    status?: Status
}

const EditorStatusAction: React.FC<EditorStatusActionProps> = ({children, status}) => {
    // Видимость
    const [visible, setVisible] = useState(false)
    // Загрузка
    const [loading, setLoading] = useState(false)
    // Отображать sms уведомления
    const [smsVisible, setSMSVisible] = useState(!!status?.sms)
    // Отображать условия попадания
    const [conditionsVisible, setConditionsVisible] = useState(!!status?.conditions)

    // Открыть
    const onClickHandler = () => setVisible(true)
    // Закрыть
    const onCloseHandler = useCallback(() => setVisible(false), [])
    // Открыть настройки смс
    const onOpenSMSHandler = useCallback(() => setSMSVisible(true), [])
    // Закрыть настройки смс
    const onCloseSMSHandler = useCallback(() => setSMSVisible(false), [])
    // Открыть условия попадания
    const onOpenConditionsHandler = useCallback(() => setConditionsVisible(true), [])
    // Закрыть условия попадания
    const onCloseConditionsHandler = useCallback(() => setConditionsVisible(false), [])
    // Изменить состояние загрузки
    const updateLoading = useCallback((loading) => setLoading(loading), [])
    // Добавление действия в дочернем теге
    const action = React.Children.map(children, (child: any) => React.cloneElement(child, {onClick: onClickHandler}))

    return (
        <>
            {action}
            <Drawer
                onClose={onCloseHandler}
                visible={visible}
                title={status ? `Редактировать статус: ${status.title}` : `Создать статус`}
                width={smsVisible ? 1000 : 500}
                destroyOnClose
                extra={
                    <Space>
                        <Button onClick={onCloseHandler} size="large" loading={loading}>Отмена</Button>
                        <Button htmlType="submit" type="primary" size="large" form="editor-status" loading={loading}>
                            Сохранить
                        </Button>
                    </Space>
                }
            >
                <EditorStatus
                    onClose={onCloseHandler}
                    updateLoading={updateLoading}
                    status={status}
                    smsVisible={smsVisible}
                    onOpenSMS={onOpenSMSHandler}
                    onCloseSMS={onCloseSMSHandler}
                    conditionsVisible={conditionsVisible}
                    onOpenConditions={onOpenConditionsHandler}
                    onCloseConditions={onCloseConditionsHandler}
                />
            </Drawer>
        </>
    )
}

export default EditorStatusAction
