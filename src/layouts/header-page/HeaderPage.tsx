import React from "react"
import {Button, Dropdown, Menu, Typography} from "antd"
import {useHistory} from "react-router"
import {ArrowLeftOutlined, MoreOutlined} from "@ant-design/icons"
import styles from "./HeaderPage.module.less"
import cn from "classnames"
import {ButtonHTMLType, ButtonType} from "antd/lib/button/button"
import {useUser} from "../../hooks/use-user"
import {User} from "../../types/User"

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
    }[] | React.ReactFragment[]
    more?: {
        icon: React.ReactFragment
        text: string
        link?: string
        access?: User["access"][]
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
    const {user} = useUser()
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
                    "icon" in item ?
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
                        </Button> : item
                )}
                {more && <Dropdown
                    arrow
                    placement="bottomRight"
                    overlay={
                        <Menu
                            items={
                                more.reduce<any[]>((acc, item, key) => {
                                    if (!item?.access || item?.access?.includes(user?.access || "manager"))
                                        acc.push({
                                            key,
                                            label: item.text,
                                            icon: item.icon,
                                            onClick: () => item.link ? history.push(item.link) : null
                                        })
                                    return acc
                                }, [])
                            }
                        />
                    }
                >
                    <Button size="large" icon={<MoreOutlined />} />
                </Dropdown>}
            </div>}
        </div>
    )
}
export default HeaderPage
