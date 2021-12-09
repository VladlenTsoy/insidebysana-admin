import React, {useState} from "react"
import {MessageOutlined} from "@ant-design/icons"
import HeaderButton from "components/header-button/HeaderButton"

const ChatHeaderButton = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <HeaderButton
            active={visible}
            onClick={visible ? close : open}
        >
            <MessageOutlined />
        </HeaderButton>
    )
}

export default ChatHeaderButton
