import React from "react"
import {CrownOutlined, PlusOutlined} from "@ant-design/icons"
import HeaderPage from "layouts/header-page/HeaderPage"
import Container from "layouts/container/Container"
import StaffTable from "../features/staff/staff-table/StaffTable"
import EditorStaffAction from "../features/staff/editor-staff-action/EditorStaffAction"
import {Button} from "antd"

const Staff = () => {
    return (
        <>
            <HeaderPage
                title="Сотрудники"
                action={[
                    <EditorStaffAction key="editor-staff">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Создать сотрудника
                        </Button>
                    </EditorStaffAction>
                ]}
                icon={<CrownOutlined />}
                tabs
            />
            <Container>
                <StaffTable />
            </Container>
        </>
    )
}

export default Staff
