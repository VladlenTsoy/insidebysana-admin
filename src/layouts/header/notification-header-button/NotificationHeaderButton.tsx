import React, {useState} from "react"
import {BellFilled} from "@ant-design/icons"
import styles from "layouts/account-menu/AccountMenu.module.less"
import {Drawer} from "antd"
import NotificationCard from "components/notification-card/NotificationCard"
import HeaderButton from "components/header-button/HeaderButton"

const NotificationHeaderButton = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <HeaderButton active={visible} onClick={visible ? close : open}>
                <BellFilled />
            </HeaderButton>
            <Drawer
                bodyStyle={{padding: "1rem"}}
                visible={visible}
                width={350}
                title="Уведомления"
                className={styles.drawer}
                // getContainer="#site-layout-content"
                // closable={false}
                mask={false}
                // style={{position: "absolute"}}
                onClose={close}
            >
                <NotificationCard>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor eaque est harum minus nam, neque,
                    nihil pariatur placeat quisquam, sit ullam veniam. Facere inventore repudiandae sequi sit voluptas
                    voluptate voluptatum!
                </NotificationCard>
            </Drawer>
        </>
    )
}

export default NotificationHeaderButton
