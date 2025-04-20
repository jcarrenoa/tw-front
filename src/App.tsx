import { useState } from 'react'
import Public from '@components/public/index'
import Private from '@components/private/index'
import './App.css'

export function App() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState({});
  
  return (
    <>
      { login ? 
        <Private/>
      :
        <Public />
    }
    </>
  )
}

export default App
