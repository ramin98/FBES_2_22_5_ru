import { Route, Routes } from 'react-router-dom'
import Header from './Header'
import Registration from './Registration'
import Login from './Login'

function Main() {

  return (
    <>
     <Header/>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default Main
