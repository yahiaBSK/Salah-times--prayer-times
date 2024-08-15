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
      console.log("hi there")
    }, 5000)
    setInterval(()=>{
      document.title = pageTitle
      console.log("hi there")
    }, 10000)
  }

  return (
    <div className='mainBody'>
    <MainPage />
    </div>
  )
}

export default App
