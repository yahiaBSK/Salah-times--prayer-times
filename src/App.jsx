import { useEffect, useRef } from 'react'
import MainPage from './components/MainPage.jsx'

function App() {
  const pageTitle = document.title
  const intervalId = useRef(null)
  const intervalId2 = useRef(null)
  useEffect(()=>{
    updatePageTitle()
  },[])
  function updatePageTitle(){
    intervalId.current = setInterval(()=>{
      document.title = "Prayer times"
    }, 5000);
    ()=>{clearInterval(intervalId.current)}
    intervalId2.current = setInterval(()=>{
      document.title = pageTitle
    }, 10000);
    ()=>{clearInterval(intervalId2.current)}
  }

  return (
    <MainPage />
  )
}

export default App
