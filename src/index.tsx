import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import App from "./App"
import {Provider} from "react-redux"
import {store} from "./store"
import UserProvider from "./features/user/user-provider/UserProvider"
import {locale} from "moment"
import "moment/locale/ru"
import {ConfigProvider} from "antd"
import ruRU from "antd/es/locale-provider/ru_RU"

locale("ru")

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={ruRU}>
                <UserProvider>
                    <App />
                </UserProvider>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
