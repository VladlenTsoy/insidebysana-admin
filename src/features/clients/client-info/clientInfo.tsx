import React from 'react';
import { Descriptions } from 'antd';
import { formatDate } from 'utils/formatDate';
import { formatPhone } from 'utils/formatPhone';
import { Client } from 'types/Client';

interface ClientInfoProps {
    client?: Client
}

const ClientInfo: React.FC<ClientInfoProps> = ({client}) => {

    return (
        <Descriptions layout="vertical" bordered style={{marginBottom: '50px'}}>
            <Descriptions.Item label="Имя">{client?.full_name}</Descriptions.Item>
            <Descriptions.Item label="Email">{client?.email}</Descriptions.Item>
            <Descriptions.Item label="Телефон">{formatPhone(client?.phone ?? '')}</Descriptions.Item>
            <Descriptions.Item label="Facebook">{client?.facebook}</Descriptions.Item>
            <Descriptions.Item label="Instagram">{client?.instagram}</Descriptions.Item>
            <Descriptions.Item label="Telegram">{client?.telegram}</Descriptions.Item>
            <Descriptions.Item label="Откуда">{client?.source?.title}</Descriptions.Item>
            <Descriptions.Item label="Дата рождения">{formatDate(client?.date_of_birth ?? '')}</Descriptions.Item>
            <Descriptions.Item label="Дата создания">{formatDate(client?.created_at ?? '')}</Descriptions.Item>
        </Descriptions>
    )
}


export default ClientInfo;