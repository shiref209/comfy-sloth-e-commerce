import React from 'react'
import { Navbar, Sidebar, Footer } from './components'
import {Routes,Route} from 'react-router-dom';
import {
  HomePage,AboutPage,PrivateRoute,ProductsPage,CartPage,SingleProductPage,ErrorPage,CheckoutPage
} from './pages/index'
import AuthWrapper from './pages/AuthWrapper';

function App() {
  return <div>
    <AuthWrapper>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/' exact element={<HomePage/>}/>
        <Route path='/private' exact element={<PrivateRoute/>}/>
        <Route path='/products' exact element={<ProductsPage/>}/>
        <Route path='/cart' exact element={<CartPage/>}/>
        <Route path='/checkout' exact element={
          <PrivateRoute>
            <CheckoutPage/>
          </PrivateRoute>}/>
        <Route path='/products/:id' exact element={<SingleProductPage/>} />
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/' exact />
        <Route exact path='/about' element={<AboutPage/>}/>
      </Routes>
    </AuthWrapper>
    <Footer/>
  </div> 
}

export default App
