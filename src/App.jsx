import { useRoutes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'

function App() {

  const element = useRoutes([
    {
      path:'/',
      element : <Home/>
    }
  ])

  return element
}

export default App
