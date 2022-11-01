import React, {useCallback, useState} from "react"
import {Divider, Form, FormInstance, Select} from "antd"
import {useGetClientBySearchQuery} from "../clientApi"
import styles from "./SelectClient.module.less"
import {formatPhone} from "utils/formatPhone"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons"
import EditorClientModal from "../editor-client/EditorClientModal"

interface SelectClientProps {
    form: FormInstance;
}

/**
 * Выбрать клиента
 * @constructor
 */
const SelectClient: React.FC<SelectClientProps> = ({form}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState<string>()
    const {isLoading, data} = useGetClientBySearchQuery({search: search})

    // Вывод клиентов
    const options =
        data?.map(client => ({
            key: client.id,
            label: (
                <div className={styles.clientOption}>
                    <div className={styles.fullName}>
                        <span className={styles.id}>#{client.id}</span>
                        {client.full_name}
                    </div>
                    <div>{formatPhone(client.phone)}</div>
                </div>
            ),
            value: client.id
        })) || []
    // Поиск
    const onSearchHandler = (val: string) => {
        if (val.trim() !== "") setSearch(val)
    }
    //
    const onChangeHandler = (clientId: number) => {
        if (!data) return
        const client = data.find(client => client.id === clientId)
        if (!client) return
        form.setFieldsValue({delivery_name: client.full_name, delivery_phone: client.phone})

    }
    // Открыть
    const onOpenModalHandler = () => setVisible(true)
    // Закрыть
    const onCloseModalHandler = () => setVisible(false)
    // Обновить статус загрузки
    const updateLoading = useCallback(loading => setLoading(loading), [])
    // После добавления клиента
    const afterFinishHandler = useCallback(client => {
        setSearch(client.id)
        form.setFieldsValue({client_id: client.id, delivery_name: client.full_name, delivery_phone: client.phone})
    }, [form])

    const createClientView = (
        <div className={styles.createClient} onClick={onOpenModalHandler}>
            <PlusOutlined /> Создать клиента
        </div>
    )

    return (
        <>
            <Form.Item label="Клиент" name="client_id" rules={[{required: true, message: "Выберите клиента!"}]}>
                <Select
                    loading={loading || isLoading}
                    showSearch
                    filterOption={false}
                    onSearch={onSearchHandler}
                    onChange={onChangeHandler}
                    allowClear
                    placeholder="Выберите клиента"
                    options={options}
                    dropdownRender={menu => (
                        <>
                            {menu}
                            <Divider style={{margin: "8px 0"}} />
                            {createClientView}
                        </>
                    )}
                    notFoundContent={
                        isLoading && loading ? <div className={styles.loading}>{<LoadingOutlined />}</div> : undefined
                    }
                />
            </Form.Item>
            <EditorClientModal
                afterFinish={afterFinishHandler}
                visible={visible}
                loading={isLoading}
                close={onCloseModalHandler}
                updateLoading={updateLoading}
            />
        </>
    )
}

export default SelectClient
