import React from "react"
import {PlusOutlined, TeamOutlined} from "@ant-design/icons"
import HeaderPage from "layouts/header-page/HeaderPage"
import Container from "layouts/container/Container"
import ClientsTable from "../../features/clients/clients-table/ClientsTable";
import EditorClientsAction from "../../features/clients/editor-clients-action/EditorClientsAction";
import {Button} from "antd";

const Clients = () => {
    return (
        <>
            <HeaderPage
                title="Клиенты"
                action={[
                    <EditorClientsAction key="editor-clients">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Создать клиента
                        </Button>
                    </EditorClientsAction>
                ]}
                icon={<TeamOutlined />}
                tabs
            />
            <Container>
                <ClientsTable />
            </Container>
        </>
    )
}

export default Clients
