import React from "react"
import {Modal} from "antd"
import {Client} from "types/Client"
import EditorClientForm from "./EditorClientForm"

interface EditorClientModalProps {
    client?: Client
    visible: boolean
    loading: boolean
    updateLoading: (loading: boolean) => void
    afterFinish?: (client: Client) => void
    close: () => void
}

const EditorClientModal: React.FC<EditorClientModalProps> = (
    {
        client,
        visible,
        loading,
        close,
        updateLoading,
        afterFinish
    }
) => {
    return <Modal
        visible={visible}
        onCancel={close}
        zIndex={9999}
        title={client ? "Редактировать клиента" : "Создать клиента"}
        okButtonProps={{form: "editor-client", htmlType: "submit", loading: loading}}
        okText="Сохранить"
        getContainer="body"
        destroyOnClose
    >
        <EditorClientForm updateLoading={updateLoading} close={close} client={client} afterFinish={afterFinish} />
    </Modal>
}

export default EditorClientModal
