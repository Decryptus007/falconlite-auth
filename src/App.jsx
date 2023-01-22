import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Verification from './pages/Verification'

function App() {

  return (
    <div className='3xl:container 3xl:mx-auto'>
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/verification"} element={<Verification />} />
        <Route path={"*"} element={<Navigate to="/signup" />} />
      </Routes>
    </div>
  )
}

export default App
