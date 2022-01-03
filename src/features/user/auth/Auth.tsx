import React, {useState} from "react"
import "./Auth.module.less"
import {Typography, Card, Form, Input, Button, Checkbox} from "antd"
import {UserOutlined, LockOutlined, LoginOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {authUser} from "features/user/auth/authUser"
import {emailRules, passwordRules} from "utils/formRules"
import styles from "./Auth.module.less"

const {Title} = Typography

interface ValuesProps {
    email: string
    password: string
}

const Auth = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const onFinishHandler = async (values: ValuesProps) => {
        setLoading(true)
        await dispatch(authUser(values))
        setLoading(false)
    }

    return (
        <div className={styles.auth}>
            <Card
                className={styles.card}
                title={
                    <Title level={3} title="Авторизация">
                        Авторизация
                    </Title>
                }
            >
                <Form layout="vertical" onFinish={onFinishHandler}>
                    <Form.Item
                        label="Почта"
                        name="email"
                        rules={emailRules({required: true})}
                    >
                        <Input size="large" prefix={<UserOutlined />} placeholder="Введите почту" />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={passwordRules({required: false})}
                    >
                        <Input.Password size="large" prefix={<LockOutlined />} placeholder="Введите пароль" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <Link className={styles.forgot} to="/">
                            Забыли пароль?
                        </Link>
                    </Form.Item>
                    <Button type="primary" size="large" block loading={loading} htmlType="submit"
                            icon={<LoginOutlined />}>
                        Войти
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default Auth
