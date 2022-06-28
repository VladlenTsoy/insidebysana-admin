import React from "react"
import HeaderPage from "layouts/header-page/HeaderPage"
import {DatabaseOutlined, PrinterOutlined, SettingOutlined, SolutionOutlined} from "@ant-design/icons"
import Tabs, {Tab} from "components/tabs/Tabs"
import {useHistory, useParams} from "react-router-dom"
import Container from "layouts/container/Container"
import SettingsMenu, {settingsMenu} from "components/settings-menu/SettingsMenu"

type SettingsType = "site_management" | "general" | "print"

const settingTabs = [
    {name: "Основные", category: "general", icon: <DatabaseOutlined />},
    {name: "Управление сайтом", category: "site_management", icon: <SolutionOutlined />},
    {name: "Печать", category: "print", icon: <PrinterOutlined />}
]

const Index = () => {
    const params = useParams<{category: SettingsType}>()
    const history = useHistory()

    // Смена статусов
    const onChangeHandler = (category: string) =>
        history.push({pathname: `/settings/${category}/${settingsMenu[category as SettingsType][0]?.key}`})

    return (
        <>
            <HeaderPage title="Настройки" icon={<SettingOutlined />} tabs />
            <Tabs defaultActiveKey={params.category || `general`} onChange={onChangeHandler}>
                {settingTabs.map(tab => (
                    <Tab tab={<>{tab.icon} {tab.name}</>} key={tab.category} />
                ))}
            </Tabs>
            <Container>
                <SettingsMenu />
            </Container>
        </>
    )
}

export default Index
