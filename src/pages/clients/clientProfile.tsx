import React from 'react';
import { Button} from 'antd';
import { useParams } from 'react-router-dom'
import { useGetClientQuery } from 'features/clients/clientsApi';
import LoadingBlock from 'components/loading-block/LoadingBlock';
import Container from 'layouts/container/Container';
import HeaderPage from 'layouts/header-page/HeaderPage';
import EditorClientsAction from 'features/clients/editor-clients-action/EditorClientsAction';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import ClientInfo from 'features/clients/client-info/clientInfo';

const ClientProfile = () => {
    const params = useParams<{id: string}>()
    const {data, isLoading} = useGetClientQuery(params.id)

    if (isLoading) return <LoadingBlock title="Загрузка страницы..." />

    return (
        <>
            <HeaderPage
                title="Информация о клиенте"
                action={[
                    <EditorClientsAction client={data} key="editor-clients">
                        <Button type="primary" icon={<EditOutlined />} size="large">
                            Редактировать
                        </Button>
                    </EditorClientsAction>
                ]}
                icon={<UserOutlined />}
                tabs
            />
            <Container>
                <ClientInfo client={data}/>
            </Container>
        </>
    )
}


export default ClientProfile;