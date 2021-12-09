import React from "react"
import Loader from "components/loader/Loader"
import "./App.less"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import {useUser} from "hooks/use-user"
import Layout from "./layouts/Layout"
import Auth from "./features/auth/Auth"

const App = () => {
    const {user} = useUser()

    return (
        <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
            <Router>
                <Switch>
                    <Route exact path="**" render={
                        () => user ?
                            <Layout>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur beatae dolor
                                ducimus est inventore, ipsa iusto laborum laudantium non numquam obcaecati odit optio
                                praesentium quas quis reprehenderit sed vero?
                            </Layout> :
                            <Auth />
                    } />
                </Switch>
            </Router>
        </React.Suspense>
    )
}

export default App
