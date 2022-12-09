import { useRoutes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/login/Login'

function App() {

  const element = useRoutes([
    {
      path:'/',
      element : <Home/>
    },
    {
      path:'/login',
      element:<Login/>
    }
  ])

  return element
}

export default App
