import React, {useState} from "react"
import {CaretDownOutlined} from "@ant-design/icons"
import {Drawer} from "antd"
import {useScreenWindow} from "hooks/use-screen-window.effect"
import styles from "./AccountMenu.module.less"
import ChatHeaderButton from "layouts/header/chat-header-button/ChatHeaderButton"
import NotificationHeaderButton from "layouts/header/notification-header-button/NotificationHeaderButton"
import HeaderButton from "components/header-button/HeaderButton"
import AccountNavigation from "./AccountNavigation"

const AccountMenu: React.FC = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <div className={styles.buttons}>
                {
                    !isBreakpoint && <>
                        <ChatHeaderButton key="chat" />
                        <NotificationHeaderButton key="notifications" />
                    </>
                }
                <HeaderButton
                    active={visible}
                    onClick={visible ? close : open}
                >
                    <CaretDownOutlined />
                </HeaderButton>
            </div>
            <Drawer
                getContainer="#site-layout-content"
                bodyStyle={{padding: 0}}
                visible={visible}
                mask={false}
                onClose={close}
                zIndex={8}
                width={250}
                title="Меню"
            >
                <AccountNavigation />
            </Drawer>
        </>
    )
}

export default AccountMenu
