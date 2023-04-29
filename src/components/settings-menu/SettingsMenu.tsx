import React, {useCallback} from "react"
import {useHistory, useParams} from "react-router-dom"
import {Col, Menu, Row} from "antd"
import CategorySetting from "../../features/category/category-setting/CategorySetting"
import TagSetting from "../../features/tag/tag-setting/TagSetting"
import SourceSetting from "../../features/source/source-setting/SourceSetting"
import ColorSetting from "../../features/color/color-setting/ColorSetting"
import SizeSetting from "../../features/size/size-setting/SizeSetting"
import NewsletterSetting from "../../features/newsletter/newsletter-setting/NewsletterSetting"

type SettingsType = "site_management" | "general" | "print"

export const settingsMenu = {
    general: [
        {label: "Категории", key: "categories"},
        {label: "Ресурсы", key: "sources"},
        {label: "Цвета", key: "colors"},
        {label: "Теги", key: "tags"},
        {label: "Размеры", key: "sizes"},
        {label: "Рассылка", key: "newsletter"},
        {label: "Промокоды", key: "promo-codes"},
        {label: "Доп. услуги", key: "additional-services"}
    ],
    site_management: [
        {label: "Баннеры", key: "banners"},
        {label: "LOOKBOOK", key: "lookbook"}
    ],
    print: [
        {label: "Категории", key: "categories"},
        {label: "Картинки", key: "images"}
    ]
}

const SettingsMenu = () => {
    const params = useParams<{category: SettingsType, setting: string}>()
    const history = useHistory()

    const onClickHandler = (e: any) => history.push(`/settings/${params.category}/${e.key}`)

    const outputTableSetting = useCallback(() => {
        if (params.category === "site_management") {
            switch (params.setting) {
                case "banners":
                    return <TagSetting />
                case "lookbook":
                    return <TagSetting />
            }
        } else if (params.category === "print") {
            switch (params.setting) {
                case "categories":
                    return <TagSetting />
                case "images":
                    return <TagSetting />
            }
        } else {
            switch (params.setting) {
                case "categories":
                    return <CategorySetting />
                case "tags":
                    return <TagSetting />
                case "colors":
                    return <ColorSetting />
                case "sources":
                    return <SourceSetting />
                case "sizes":
                    return <SizeSetting />
                case "newsletter":
                    return <NewsletterSetting />
                case "promo-codes":
                    return <TagSetting />
                case "additional-services":
                    return <TagSetting />
            }
        }
    }, [params])

    return (
        <>
            <Row gutter={16}>
                <Col xl={5}>
                    <Menu
                        items={settingsMenu[params.category]}
                        selectedKeys={[params.setting]}
                        onClick={onClickHandler}
                    />
                </Col>
                <Col xl={19}>{outputTableSetting()}</Col>
            </Row>
        </>
    )
}

export default SettingsMenu
