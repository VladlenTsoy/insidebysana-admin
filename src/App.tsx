import React from "react"
import Loader from "components/loader/Loader"
import "./App.less"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import {useUser} from "hooks/use-user"
import Layout from "./layouts/Layout"
import Auth from "./features/user/auth/Auth"

const Home = React.lazy(() => import("./pages/home"))
const Products = React.lazy(() => import("./pages/products"))
const Product = React.lazy(() => import("./pages/product"))

const App = () => {
    const {user} = useUser()

    return (
        <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
            <Router>
                <Switch>
                    <Route exact path="**" render={
                        () => user ?
                            <Layout>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/products/:status" component={Products} />
                                <Route exact path="/products/product/create" component={Product} />
                                <Route exact path="/products/product/edit/:id" component={Product} />
                                <Route exact path="/products/product/edit/:id/:color" component={Product} />
                            </Layout> :
                            <Auth />
                    } />
                </Switch>
            </Router>
        </React.Suspense>
    )
}

export default App
