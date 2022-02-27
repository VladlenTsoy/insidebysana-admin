import React from "react"
import Loader from "components/loader/Loader"
import "./App.less"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import {useUser} from "hooks/use-user"
import Layout from "./layouts/Layout"
import Auth from "./features/user/auth/Auth"
import LoadingBlock from "./components/loading-block/LoadingBlock"

const Home = React.lazy(() => import("./pages/home"))
const Orders = React.lazy(() => import("./pages/orders/orders"))
const OrdersArchive = React.lazy(() => import("./pages/orders/archive"))
const EditorOrder = React.lazy(() => import("./pages/orders/order"))
const Products = React.lazy(() => import("./pages/products"))
const Product = React.lazy(() => import("./pages/product"))

const App = () => {
    const {user} = useUser()
    return (
        <React.Suspense fallback={<Loader text="Загрузка доступа..." />}>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="**"
                        render={() =>
                            user ? (
                                <Layout>
                                    <React.Suspense fallback={<LoadingBlock title="Загрузка страницы..." />}>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/orders" component={Orders} />
                                        <Route exact path="/orders/archive" component={OrdersArchive} />
                                        <Route exact path="/orders/order/create" component={EditorOrder} />
                                        <Route exact path="/orders/order/edit/:id" component={EditorOrder} />
                                        <Route exact path="/products/:status" component={Products} />
                                        <Route exact path="/products/product/create" component={Product} />
                                        <Route exact path="/products/product/edit/:id" component={Product} />
                                        <Route exact path="/products/product/edit/:id/:color" component={Product} />
                                    </React.Suspense>
                                </Layout>
                            ) : (
                                <Auth />
                            )
                        }
                    />
                </Switch>
            </Router>
        </React.Suspense>
    )
}

export default App
