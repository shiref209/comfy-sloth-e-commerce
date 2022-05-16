import React from 'react'
import { Navbar, Sidebar, Footer } from './components'
import {Routes,Route,Link} from 'react-router-dom';
import {
  HomePage,AboutPage,PrivateRoute,ProductsPage,CartPage,SingleProductPage,ErrorPage,CheckoutPage
} from './pages/index'

function App() {
  return <div>
    <Navbar/>
    <Sidebar/>
    <Routes>
      <Route path='/' exact element={<HomePage/>}/>
      <Route path='/private' exact element={<PrivateRoute/>}/>
      <Route path='/products' exact element={<ProductsPage/>}/>
      <Route path='/cart' exact element={<CartPage/>}/>
      <Route path='/checkout' exact element={<CheckoutPage/>}/>
      <Route path='/products/:id' exact element={<SingleProductPage/>} />
      <Route path='*' element={<ErrorPage/>}/>
      <Route path='/' exact />
      <Route exact path='/about' element={<AboutPage/>}/>

    </Routes>
    
    <Footer/>
  </div> 
}

export default App
