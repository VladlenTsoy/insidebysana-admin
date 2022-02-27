import React from "react"
import {Button, Dropdown, Menu, Typography} from "antd"
import {useHistory} from "react-router"
import {ArrowLeftOutlined, MoreOutlined} from "@ant-design/icons"
import styles from "./HeaderPage.module.less"
import cn from "classnames"
import {ButtonHTMLType, ButtonType} from "antd/lib/button/button"

interface HeaderPageProps {
    title: string
    linkBack?: string
    icon?: React.ReactFragment
    tabs?: boolean
    full?: boolean
    action?: {
        icon: React.ReactFragment
        text: string
        link?: string
        type?: ButtonType
        form?: string
        htmlType?: ButtonHTMLType
        loading?: boolean
    }[]
    more?: {
        icon: React.ReactFragment
        text: string
        link?: string
    }[]
}

const {Title} = Typography

const HeaderPage: React.FC<HeaderPageProps> = (
    {
        title,
        linkBack,
        action,
        icon,
        tabs,
        full,
        more
    }
) => {
    const history = useHistory()
    const onClickBackHandler = () => (linkBack ? history.push(linkBack) : history.goBack())

    return (
        <div className={cn(styles.headerPage, {[styles.tabs]: tabs, [styles.full]: full})}>
            {icon ? (
                <div className={styles.back}>{icon}</div>
            ) : (
                <div className={styles.back} onClick={onClickBackHandler}>
                    <ArrowLeftOutlined />
                </div>
            )}
            <Title level={1}>{title}</Title>
            {action && <div className={styles.action}>
                {action.map((item, key) =>
                    <Button
                        key={key}
                        type={item.type}
                        icon={item.icon}
                        htmlType={item.htmlType || "button"}
                        size="large"
                        form={item.form}
                        loading={item.loading}
                        onClick={() => item.link ? history.push(item.link) : null}
                    >
                        {item.text}
                    </Button>
                )}
                {more && <Dropdown
                    arrow
                    placement="bottomRight"
                    overlay={
                        <Menu>
                            {more.map((item, key) =>
                                <Menu.Item
                                    key={key}
                                    onClick={() => item.link ? history.push(item.link) : null}
                                >
                                    {item.icon} {item.text}
                                </Menu.Item>
                            )}
                        </Menu>
                    }
                >
                    <Button size="large" icon={<MoreOutlined />} />
                </Dropdown>}
            </div>}
        </div>
    )
}
export default HeaderPage
