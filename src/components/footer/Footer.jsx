import './style.css'
import ybskImage from '../../assets/ybsk2.webp'


function Footer() {
  return(
    <>
    <div className="mainFooterDiv">
      <div className="devInfoDiv">
        <div className="imgDiv">
          <img src={ybskImage} alt="Prayer image" loading='eager'/>
        </div>
        <div className="infoDiv">
          <p id='devName'>Yahia BSK</p>
          <p id="devJob">full-stack web developer</p>
        </div>
      </div>
      <div className="splittLine">
        
      </div>
      <div className="socialLinksDiv">
        <a id="facebook" onClick={()=>{
          setTimeout(() => {
            window.open('https://www.facebook.com/BSK.yahia/', '_blank');
          }, 500);
        }}><i className="fa-brands fa-facebook-f"></i></a>
        <a id="instagram" onClick={()=>{
          setTimeout(() => {
            window.open('https://www.instagram.com/bsk.yahia/', '_blank');
          }, 500);
        }}><i className="fa-brands fa-instagram"></i></a>
        <a id="github" onClick={()=>{
          setTimeout(() => {
            window.open('https://github.com/yahiaBSK', '_blank');
          }, 500);
        }}><i className="fa-brands fa-github-alt"></i></a>
        <a id="linkedin" onClick={()=>{
          setTimeout(() => {
            window.open('https://www.linkedin.com/in/yahia-bsk/', '_blank');
          }, 500);
        }}><i className="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
    </>
  )
}
export default Footer