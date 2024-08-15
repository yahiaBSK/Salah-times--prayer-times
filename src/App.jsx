import { useEffect, useRef } from 'react'
import MainPage from './components/MainPage.jsx'

function App() {
  const pageTitle = document.title
  const intervalId = useRef(null)
  useEffect(()=>{
    updatePageTitle()
  },[])
  function updatePageTitle(){
    setInterval(()=>{
      document.title = "Prayer times"
    }, 5000)
    setInterval(()=>{
      document.title = pageTitle
    }, 10000)
  }

  return (
    <div className='mainBody'>
    <MainPage />
    </div>
  )
}

export default App
