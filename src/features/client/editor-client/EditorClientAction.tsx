import React, {useCallback, useState} from "react"
import {Client} from "types/Client"
import EditorClientModal from "./EditorClientModal"

interface EditorClientActionProps {
    client?: Client;
}

const EditorClientAction: React.FC<EditorClientActionProps> = ({client, children}) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeHandler = useCallback(() => setVisible(false), [])
    const clickHandler = useCallback(() => setVisible(true), [])
    const updateLoading = useCallback(loading => setLoading(loading), [])

    const action = React.Children.map(children, (child: any) => React.cloneElement(child, {onClick: clickHandler}))

    return (
        <>
            {action}
            <EditorClientModal
                client={client}
                visible={visible}
                loading={loading}
                close={closeHandler}
                updateLoading={updateLoading}
            />
        </>
    )
}

export default EditorClientAction
