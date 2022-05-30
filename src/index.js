import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
    <BrowserRouter>
        <Auth0Provider
        domain="dev-1b15k9lr.eu.auth0.com"
        clientId="ZXqWsTm2oPApeApkMLCTuSYF6ZhuYhDy"
        redirectUri={window.location.origin}>
            <UserProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App /> 
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </UserProvider>

        </Auth0Provider>

        
    </BrowserRouter>

, document.getElementById('root'))
