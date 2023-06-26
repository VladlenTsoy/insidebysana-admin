import React from 'react';
import { Button, Descriptions } from 'antd';
import { useLocation } from 'react-router-dom'
import { useGetClientQuery } from 'features/clients/clientsApi';
import LoadingBlock from 'components/loading-block/LoadingBlock';
import Container from 'layouts/container/Container';
import { formatDate } from 'utils/formatDate';
import HeaderPage from 'layouts/header-page/HeaderPage';
import EditorClientsAction from 'features/clients/editor-clients-action/EditorClientsAction';
import { EditOutlined, UserOutlined } from '@ant-design/icons';

const ClientProfile = () => {
    const location = useLocation()
    const id = location.state
    const {data, isLoading} = useGetClientQuery(id)

    if (isLoading) return <LoadingBlock title="Загрузка страницы..." />

    return (
        <Container>
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
            <Descriptions layout="vertical" bordered>
                <Descriptions.Item label="Имя">{data.full_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
                <Descriptions.Item label="Телефон">{data.phone}</Descriptions.Item>
                <Descriptions.Item label="Facebook">{data.facebook}</Descriptions.Item>
                <Descriptions.Item label="Instagram">{data.instagram}</Descriptions.Item>
                <Descriptions.Item label="Telegram">{data.telegram}</Descriptions.Item>
                <Descriptions.Item label="Откуда">{data.source?.title}</Descriptions.Item>
                <Descriptions.Item label="Дата рождения">{formatDate(data.date_of_birth)}</Descriptions.Item>
                <Descriptions.Item label="Дата создания">{formatDate(data.created_at)}</Descriptions.Item>
            </Descriptions>
        </Container>
    )
}


export default ClientProfile;