import './style.css'
import ybskImage from '../../assets/ybsk2.jpg'


function Footer() {
  return(
    <>
    <div className="mainFooterDiv">
      <div className="devInfoDiv">
        <div className="imgDiv">
          <img src={ybskImage} alt="" />
        </div>
        <div className="infoDiv">
          <p id='devName'>Yahia BSK</p>
          <p id="devJob">full-stack web developer</p>
        </div>
      </div>
      <div className="splittLine">
        
      </div>
      <div className="socialLinksDiv">
        <a href="https://www.facebook.com/BSK.yahia/" target='_blank' id="facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/bsk.yahia/" target='_blank' id="instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://github.com/yahiaBSK" target='_blank' id="github"><i class="fa-brands fa-github-alt"></i></a>
        <a href="https://www.linkedin.com/in/yahia-bsk/" target='_blank' id="linkedin"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
    </>
  )
}
export default Footer