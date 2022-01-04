import React from "react"
import styles from "./ProfileHeader.module.less"
import {Avatar} from "antd"
import {UserOutlined} from "@ant-design/icons"

const ProfileHeader = () => {
    return (
        <div className={styles.profile}>
            <Avatar style={{backgroundColor: "#ffaf73", verticalAlign: "middle"}} size="large" gap={3}
                    icon={<UserOutlined />} />
            <div className={styles.details}>
                <div className={styles.name}>Vladlen Tsoy</div>
                <div className={styles.tag}>#232</div>
            </div>
        </div>
    )
}

export default ProfileHeader