import React, {useState} from "react"
import {CaretDownOutlined, PoweroffOutlined} from "@ant-design/icons"
import {Drawer, Dropdown, Menu} from "antd"
import {useUser} from "hooks/use-user"
import {useScreenWindow} from "hooks/use-screen-window.effect"
import styles from "./AccountMenu.module.less"
import ProfileItem from "./profile-item/ProfileItem"
import SettingsItem from "./settings-item/SettingsItem"
import ChatHeaderButton from "layouts/header/chat-header-button/ChatHeaderButton"
import NotificationHeaderButton from "layouts/header/notification-header-button/NotificationHeaderButton"
import HeaderButton from "components/header-button/HeaderButton"

const AccountMenu: React.FC = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})
    const {logout} = useUser()
    const [visible, setVisible] = useState(false)

    const toggle = (visible: boolean) => setVisible(visible)

    const menu = (
        <Menu>
            <Menu.Item className={styles.accountItem} key="profile">
                <ProfileItem />
            </Menu.Item>
            <Menu.Item className={styles.accountItem} key="settings">
                <SettingsItem />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                className={styles.accountItem}
                onClick={logout}
                key="exit"
            >
                <PoweroffOutlined /> Выход
            </Menu.Item>
        </Menu>
    )

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    if (isBreakpoint)
        return (
            <>
                <HeaderButton
                    active={visible}
                    onClick={visible ? close : open}
                >
                    <CaretDownOutlined />
                </HeaderButton>
                <Drawer
                    getContainer="#site-layout-content"
                    // style={{position: "absolute"}}
                    bodyStyle={{padding: 0}}
                    visible={visible}
                    closable={false}
                    mask={false}
                    onClose={close}
                    zIndex={4}
                >
                    {menu}
                </Drawer>
            </>
        )

    return (
        <div className={styles.buttons}>
            <ChatHeaderButton key="chat" />
            <NotificationHeaderButton key="notifications" />
            <Dropdown
                onVisibleChange={toggle}
                overlay={menu}
                arrow
                placement="bottomRight"
                visible={visible}
            >
                <HeaderButton
                    active={visible}
                    onClick={visible ? close : open}
                >
                    <CaretDownOutlined />
                </HeaderButton>
            </Dropdown>
        </div>
    )
}

export default AccountMenu
