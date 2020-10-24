import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Account from './pages/Account'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import OurHistory from './pages/OurHistory'
import CreateProduct from './pages/CreateProduct'
import ManageProduct from './pages/ManageProduct'
import EditProduct from './pages/EditProduct'
import EditUser from './pages/EditUser'

const Routes = () => (
  <Switch>
    <Route exact path="/cart" component={CartPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/account/:userId/edit" component={EditUser} />
    <Route exact path="/create" component={CreateProduct} />
    <Route exact path="/manage-product" component={ManageProduct} />
    <Route exact path="/our-history" component={OurHistory} />
    <Route exact path="/products/:productId" component={ProductPage} />
    <Route exact path="/products/:productId/edit" component={EditProduct} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
