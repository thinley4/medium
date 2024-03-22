import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/blog' element={<Blog />}/>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
