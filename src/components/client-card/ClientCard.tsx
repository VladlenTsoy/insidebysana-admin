import React from "react"
import styles from "./ClientCard.module.less"
import {Avatar, Button} from "antd"
import {UserOutlined} from "@ant-design/icons"
import {formatPhone} from "utils/formatPhone"
import {Link} from "react-router-dom"

interface ClientCardProps {
    client: {
        id: number
        full_name: string
        phone: string
    }
}

const ClientCard: React.FC<ClientCardProps> = ({client}) => {
    return (
        <div className={styles.card}>
            <Avatar
                icon={<UserOutlined />}
                style={{backgroundColor: "#ffaf73", verticalAlign: "middle"}}
                size="large"
            />
            <div className={styles.details}>
                <div className={styles.name}>{client.full_name}</div>
                <div className={styles.phone}>{formatPhone(client.phone)}</div>
            </div>
            <div className={styles.action}>
                <Link to={`/clients/client/${client.id}`}>
                    <Button>Подробнее</Button>
                </Link>
            </div>
        </div>
    )
}

export default ClientCard
