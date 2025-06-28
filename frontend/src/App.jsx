import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './Pages/Placeorder/PlaceOrder'
import Home  from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/Loginpopupp/LoginPopUp'
import Verifie from './Pages/verify/Verifie'
import Myorders from './Pages/myorders/Myorders'

const App = () => {
  const [ShowLogin,setShowLogin]=useState(false);

  return (
    <>
    {ShowLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/cart' element={<Cart/>} />
       <Route path='/order' element={<PlaceOrder/>} />
       <Route path='/verifie' element={<Verifie/>} />
       <Route path='/myorders' element={<Myorders/>} />
      </Routes>
    </div>
      <Footer/>
    </>
  )
}

export default App
