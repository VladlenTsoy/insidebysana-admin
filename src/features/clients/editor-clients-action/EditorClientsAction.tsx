import React, {useCallback, useState} from "react"
import {Modal} from "antd"
import {Client} from "types/Client"
import EditorClients from "./EditorClients";

interface EditorClientsActionProps {
    client?: Client
}

const EditorClientsAction: React.FC<EditorClientsActionProps> = ({children, client}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Modal
                title={client ? `Редактировать: ${client.full_name}` : `Создать клиента`}
                visible={visible}
                onCancel={close}
                cancelButtonProps={{size: "large"}}
                okButtonProps={{form: "editor-clients", htmlType: "submit", loading: loading, size: "large"}}
                okText="Сохранить"
                destroyOnClose
            >
                <EditorClients client={client} setLoading={setLoading} close={close} />
            </Modal>
        </>
    )
}

export default EditorClientsAction
