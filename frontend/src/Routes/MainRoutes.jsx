import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Home from '@/pages/User/Home'
import Profile from '@/pages/User/Profile'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import Product from '@/pages/User/Product'
import Dashboard from '@/pages/Admin/Dashboard'
import AnalyticDashboard from '@/pages/Admin/AnalyticDashboard'
import ProductDashboard from '@/pages/Admin/ProductDashboard'
import SingleProduct from '@/pages/User/SingleProduct'
import CartPage from '@/pages/User/CartPage'
import Purchase from '@/pages/User/Purchase'
import Order from '@/pages/User/Order'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }/> 
      <Route path='/product' element={
        <ProtectedRoute>
          <Product/>
        </ProtectedRoute>
      }/>
      <Route path='/product/:id' element={
        <ProtectedRoute>
          <SingleProduct/>
        </ProtectedRoute>
      }/>
      <Route path='/cart' element={
        <ProtectedRoute>
          <CartPage/>
        </ProtectedRoute>
      }/>
      <Route path='/order' element={
        <ProtectedRoute>
          <Order/>
        </ProtectedRoute>
      }/>
      <Route path='/purchase' element={
        <ProtectedRoute>
          <Purchase/>
        </ProtectedRoute>
      }/>

      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }>
        <Route index element={
          <ProtectedRoute>
            <AnalyticDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='product' element={
          <ProtectedRoute>
            <ProductDashboard/>
          </ProtectedRoute>
        }/>
      </Route>
    </Routes>
  )
}

export default MainRoutes