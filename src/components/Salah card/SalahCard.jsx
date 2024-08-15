import './style.css'


function SalahCard(props){
  
  return(
    <>
    <div className='mainSalahCardDiv'>
      <div className='imgDiv'>
        <img src={props.image} alt="mosque img"/>
        <p>{props.salahName}</p>
      </div>
      <div className='salahInfoDiv'>
        <p>{props.salahTime}</p>
        <p id='remainingTimeText'>الوقت المتبقي</p>
        <p id='remainingTime' style={{color: props.color}}>{props.remainingTime}</p>
      </div>
    </div>
    </>
  )
}
export default SalahCard