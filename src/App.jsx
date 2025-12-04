import React from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Login from './pages/login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashbord'
import Navbar from './pages/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Overview from './pages/Overview'
import Income from './pages/Income'
import Expense from './pages/Expense'

// import {Toaster} from "react-hot-toast"

const App = () => {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path='/overview' element={<Overview/>}/>
    <Route path="/income" element={<Income/>} />


    <Route path="/expenses" element={<Expense />} />
  

    <Route path="/category" element={<Category />} />
    <Route path="/filter" element={<Filter />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/home' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
  
   </Routes>
   </BrowserRouter>
  )
}

export default App