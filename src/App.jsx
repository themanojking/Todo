import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Authentication/Signup'
import Signin from './Authentication/Signin'
import Todo from './Todo'

function App() {
  return (
    <>
       <BrowserRouter>
          <Routes>
             <Route path='/' element={<Signup />}></Route>
             <Route path='/signin' element={<Signin />} ></Route>
             <Route path='/todo' element={<Todo />}></Route>
          </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
