import React, {useEffect, useState} from "react"
import {Button, Layout as AntdLayout} from "antd"
import {useHistory} from "react-router-dom"
import {useScreenWindow} from "../hooks/use-screen-window.effect"
import styles from "./Layout.module.less"
import {useDispatch} from "store"
import {changeTitle} from "features/app/appSlice"
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons"
import AccountMenu from "./account-menu/AccountMenu"
import Sidebar from "./sidebar/Sidebar"
import SearchHeader from "./header/search-header/SearchHeader"
import ProfileHeader from "./header/profile-header/ProfileHeader"

const {Header, Sider, Content} = AntdLayout

const Titles: any = {
    "/": "Главная",
    "/orders": "Заказы",
    "/products": "Продукты",
    "/clients": "Клиенты",
    "/settings": "Настройки",
    "/staff": "Сотрудники",
    "/profile": "Профиль"
}

const Layout: React.FC = ({children}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "lg"})
    const history = useHistory()
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(true)

    const onCollapsedHandler = () => setCollapsed(prevState => !prevState)

    useEffect(() => {
        if (history.listen) {
            const unListen = history.listen((location: any) => {
                if (Titles[location.pathname]) dispatch(changeTitle(Titles[location.pathname]))
            })
            if (Titles[history.location.pathname]) dispatch(changeTitle(Titles[history.location.pathname]))
            return () => {
                unListen()
            }
        }
    }, [history, dispatch])

    return (
        <AntdLayout className={styles.layout}>
            <Sider
                collapsible
                collapsed={collapsed}
                width="250px"
                trigger={null}
                collapsedWidth={isBreakpoint ? 0 : 80}
            >
                <Sidebar collapsed={collapsed} />
            </Sider>
            <AntdLayout className={styles.siteLayout}>
                <Header className={styles.siteLayoutHeader}>
                    <div className={styles.optionsHeader}>
                        {React.createElement(Button, {
                            onClick: onCollapsedHandler,
                            icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
                            size: "large",
                            shape: "circle"
                        })}
                        <ProfileHeader />
                        <SearchHeader />
                    </div>
                    <AccountMenu />
                </Header>
                <Content className={styles.siteLayoutContent} id="site-layout-content">
                    {children}
                </Content>
            </AntdLayout>
        </AntdLayout>
    )
}

export default Layout
